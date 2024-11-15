import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <footer className={cn('bg-card', className)}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="grid items-center justify-center py-2 sm:grid-cols-3">
          <div>
            <Button className="rounded-full" variant="ghost" size="icon">
              <YoutubeIcon className="size-5" />
            </Button>
            <Button className="rounded-full" variant="ghost" size="icon">
              <TwitterIcon className="size-5" />
            </Button>
            <Button className="rounded-full" variant="ghost" size="icon">
              <InstagramIcon className="size-5" />
            </Button>
            <Button className="rounded-full" variant="ghost" size="icon">
              <FacebookIcon className="size-5" />
            </Button>
          </div>
          <p className="h-7 text-center text-sm ">© 2024 Xxxxx, Inc.</p>
          <div className="flex justify-center sm:justify-end">
            <Logo size="sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}
