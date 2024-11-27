import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginButton() {
  const [isLogin, setIsLogin] = useState(false);

  const handleClickAvatar = () => {
    console.log('avatar');
  };

  return (
    <>
      {isLogin ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="cursor-pointer" onClick={handleClickAvatar}>
              <AvatarImage src="/images/avatar05.png" alt="avatar-image" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>プロフィールと一般設定</p>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Link to="/login">
          <Button className="rounded-full" variant="ghost">
            ログイン
          </Button>
        </Link>
      )}
    </>
  );
}
