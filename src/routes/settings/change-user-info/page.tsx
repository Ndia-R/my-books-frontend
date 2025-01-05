import AvatarCarousel from '@/components/avatar-carousel';
import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AVATER_IMAGE_URL } from '@/constants/constants';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/hooks/use-user';
import { getCurrentUser, updateCurrentUser } from '@/lib/data';
import { Loader2Icon } from 'lucide-react';
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
];

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [defaultAvatar, setDefaultAvatar] = useState<number | undefined>(undefined);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const avatarUrlRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { setUser } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    const initUserInfo = async () => {
      const currentUser = await getCurrentUser();

      if (nameRef && nameRef.current && currentUser) {
        nameRef.current.focus();
        nameRef.current.value = currentUser.name || '';

        const index = AVATARS.findIndex(
          (avatar) => avatar.avatarUrl === currentUser.avatarUrl
        );
        console.log({ index });

        setDefaultAvatar(index);
      }
    };
    initUserInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const avatarUrl = form.get('avatar-url') as string;

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
    if (avatarUrlRef && avatarUrlRef.current) {
      avatarUrlRef.current.value = AVATARS[selectedIndex].avatarUrl;
    }
    console.log('selected:', selectedIndex);
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
            </div>

            <div>
              <Label className="text-xs" htmlFor="name">
                アバター画像
              </Label>
              <div className="flex justify-center">
                <AvatarCarousel
                  items={AVATARS}
                  itemWidth={80}
                  frameWidth={220}
                  defaultSelected={defaultAvatar}
                  onSelected={handleSelectedAvatar}
                />
              </div>
              <input ref={avatarUrlRef} className="w-[400px] text-black" type="text" />
            </div>

            <Button
              className="mt-6 w-full rounded-full"
              type="submit"
              disabled={isSubmitting}
            >
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
