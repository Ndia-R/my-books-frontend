import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Page() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isShownPassword, setIsShownPassword] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="">
      <div className="mt-6 flex flex-col items-center justify-items-center gap-y-4 sm:mt-16">
        <Logo size="lg" />
        <p className="font-semibold">アカウントの作成</p>
        <Card>
          <CardContent className="p-6">
            <form className="flex w-64 flex-col gap-y-4" action="">
              <div>
                <p className="text-xs">アカウント</p>
                <Input
                  className="my-2 rounded-full"
                  value={account}
                  ref={ref}
                  onChange={(e) => setAccount(e.target.value)}
                />
                {/* <p className="text-xs">error</p> */}
              </div>
              <div>
                <p className="text-xs">パスワード</p>
                <div className="relative">
                  <Input
                    className="my-2 rounded-full"
                    type={isShownPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    className="absolute right-0 top-0 rounded-full hover:bg-transparent hover:text-foreground"
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsShownPassword(!isShownPassword)}
                  >
                    {isShownPassword ? (
                      <EyeIcon className="size-4" />
                    ) : (
                      <EyeOffIcon className="size-4" />
                    )}
                  </Button>
                  {/* <p className="text-xs">error</p> */}
                </div>
              </div>
              <Button className="mt-6 w-full rounded-full" type="submit">
                新規登録
              </Button>
            </form>
            <div className="mt-6 flex justify-center gap-x-1 text-xs">
              <p className="text-muted-foreground">アカウントをお持ちですか？</p>
              <Link to={'/login'}>
                <p className="text-primary hover:underline">ログイン</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
