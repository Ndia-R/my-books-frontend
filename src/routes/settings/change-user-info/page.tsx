import AvatarCarousel from '@/components/avatar-carousel';
import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AVATER_IMAGE_URL } from '@/constants/constants';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { updateCurrentUser } from '@/lib/action';
import { checkUsernameExists, getCurrentUser } from '@/lib/data';
import { CircleHelpIcon, Loader2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AVATARS = [
  { index: 0, avatarUrl: `${AVATER_IMAGE_URL}/avatar00.png` },
  { index: 1, avatarUrl: `${AVATER_IMAGE_URL}/avatar01.png` },
  { index: 2, avatarUrl: `${AVATER_IMAGE_URL}/avatar02.png` },
  { index: 3, avatarUrl: `${AVATER_IMAGE_URL}/avatar03.png` },
  { index: 4, avatarUrl: `${AVATER_IMAGE_URL}/avatar04.png` },
  { index: 5, avatarUrl: `${AVATER_IMAGE_URL}/avatar05.png` },
  { index: 6, avatarUrl: `${AVATER_IMAGE_URL}/avatar06.png` },
  { index: 7, avatarUrl: `${AVATER_IMAGE_URL}/avatar07.png` },
  { index: 8, avatarUrl: `${AVATER_IMAGE_URL}/avatar08.png` },
  { index: 9, avatarUrl: `${AVATER_IMAGE_URL}/avatar09.png` },
  { index: 10, avatarUrl: `${AVATER_IMAGE_URL}/avatar10.png` },
  { index: 11, avatarUrl: `${AVATER_IMAGE_URL}/avatar11.png` },
  { index: 12, avatarUrl: `${AVATER_IMAGE_URL}/avatar12.png` },
  { index: 13, avatarUrl: `${AVATER_IMAGE_URL}/avatar13.png` },
  { index: 14, avatarUrl: `${AVATER_IMAGE_URL}/avatar14.png` },
  { index: 15, avatarUrl: `${AVATER_IMAGE_URL}/avatar15.png` },
  { index: 16, avatarUrl: `${AVATER_IMAGE_URL}/avatar16.png` },
  { index: 17, avatarUrl: `${AVATER_IMAGE_URL}/avatar17.png` },
  { index: 18, avatarUrl: `${AVATER_IMAGE_URL}/avatar18.png` },
  { index: 19, avatarUrl: `${AVATER_IMAGE_URL}/avatar19.png` },
  { index: 20, avatarUrl: `${AVATER_IMAGE_URL}/avatar20.png` },
  { index: 21, avatarUrl: `${AVATER_IMAGE_URL}/avatar21.png` },
  { index: 22, avatarUrl: `${AVATER_IMAGE_URL}/avatar22.png` },
  { index: 23, avatarUrl: `${AVATER_IMAGE_URL}/avatar23.png` },
  { index: 24, avatarUrl: `${AVATER_IMAGE_URL}/avatar24.png` },
  { index: 25, avatarUrl: `${AVATER_IMAGE_URL}/avatar25.png` },
  { index: 26, avatarUrl: `${AVATER_IMAGE_URL}/avatar26.png` },
  { index: 27, avatarUrl: `${AVATER_IMAGE_URL}/avatar27.png` },
  { index: 28, avatarUrl: `${AVATER_IMAGE_URL}/avatar28.png` },
  { index: 29, avatarUrl: `${AVATER_IMAGE_URL}/avatar29.png` },
  { index: 30, avatarUrl: `${AVATER_IMAGE_URL}/avatar30.png` },
  { index: 31, avatarUrl: `${AVATER_IMAGE_URL}/avatar31.png` },
  { index: 32, avatarUrl: `${AVATER_IMAGE_URL}/avatar32.png` },
  { index: 33, avatarUrl: `${AVATER_IMAGE_URL}/avatar33.png` },
  { index: 34, avatarUrl: `${AVATER_IMAGE_URL}/avatar34.png` },
  { index: 35, avatarUrl: `${AVATER_IMAGE_URL}/avatar35.png` },
  { index: 36, avatarUrl: `${AVATER_IMAGE_URL}/avatar36.png` },
  { index: 37, avatarUrl: `${AVATER_IMAGE_URL}/avatar37.png` },
  { index: 38, avatarUrl: `${AVATER_IMAGE_URL}/avatar38.png` },
  { index: 39, avatarUrl: `${AVATER_IMAGE_URL}/avatar39.png` },
  { index: 40, avatarUrl: `${AVATER_IMAGE_URL}/avatar40.png` },
];

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [nameErrorMessage, setNameErrorMessage] = useState('');

  const [defaultAvatar, setDefaultAvatar] = useState<number | undefined>(undefined);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const avatarUrlRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const initUserInfo = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (nameRef.current && avatarUrlRef.current && currentUser) {
        nameRef.current.focus();
        nameRef.current.value = currentUser.name || '';
        avatarUrlRef.current.value = currentUser.avatarUrl;

        const index =
          AVATARS.find((avatar) => avatar.avatarUrl === currentUser.avatarUrl)?.index ||
          0;

        setDefaultAvatar(index);
      }
    };
    initUserInfo();
  }, [setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const avatarUrl = form.get('avatar-url') as string;

    if (name === '') {
      setNameErrorMessage('ユーザー名は必須です。');
      return;
    }

    if (user?.name !== name && (await checkUsernameExists(name))) {
      setNameErrorMessage('そのユーザー名はすでに使われています。');
      return;
    }

    setIsSubmitting(true);
    const isSuccess = await updateCurrentUser({
      name,
      avatarUrl,
    });
    if (!isSuccess) {
      setIsSubmitting(false);
      toast({
        title: 'ユーザー情報を変更できませんでした',
        description: '入力内容を確認してください',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    toast({ title: 'ユーザー情報を変更しました' });

    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setIsSubmitting(false);

    navigate('/settings/profile');
  };

  const handleSelectedAvatar = (selectedIndex: number) => {
    if (avatarUrlRef.current) {
      avatarUrlRef.current.value = AVATARS[selectedIndex].avatarUrl;
    }
  };

  return (
    <div className="my-3 flex flex-col items-center justify-items-center gap-y-3 sm:my-16">
      <Logo size="lg" disableLink />
      <p className="font-semibold">ユーザー情報の編集</p>
      <Card className="w-80 rounded-3xl sm:w-96">
        <CardContent className="p-6 sm:px-10">
          <form className="flex w-full flex-col gap-y-4" onSubmit={handleSubmit}>
            <div>
              <Label className="text-xs" htmlFor="name">
                ユーザー名
              </Label>
              <Input
                ref={nameRef}
                className="my-2 rounded-full"
                id="name"
                name="name"
                autoComplete="off"
                spellCheck="false"
              />
              <p className="h-4 text-xs text-destructive">{nameErrorMessage}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-x-1">
                <Label className="text-xs" htmlFor="name">
                  アバター画像
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleHelpIcon className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent>チェックマークは現在のアバターです</TooltipContent>
                </Tooltip>
              </div>
              <div className="flex justify-center">
                <AvatarCarousel
                  items={AVATARS}
                  itemWidth={80}
                  frameWidth={220}
                  defaultSelected={defaultAvatar}
                  onSelected={handleSelectedAvatar}
                />
              </div>
              <input
                ref={avatarUrlRef}
                className="w-[400px] text-black"
                type="text"
                name="avatar-url"
                hidden
              />
            </div>

            <Button className="w-full rounded-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2Icon className="animate-spin" /> : '変更'}
            </Button>
            <Button
              className="w-full rounded-full bg-transparent"
              type="button"
              variant="outline"
              asChild
            >
              <Link to="/settings/profile">キャンセル</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
