import { useAuth } from '@/auth/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginButton() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickAvatar = () => {
    console.log('avatar');
  };

  const handleClickLogin = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="cursor-pointer" onClick={handleClickAvatar}>
              <AvatarImage
                src={user?.avatarUrl || '/images/avatar01.png'}
                alt="avatar-image"
              />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>プロフィールと一般設定</p>
            <div>{user?.id}</div>
            <div>{user?.account}</div>
          </TooltipContent>
        </Tooltip>
      ) : (
        <Button className="rounded-full" variant="ghost" onClick={handleClickLogin}>
          ログイン
        </Button>
      )}
    </>
  );
}
