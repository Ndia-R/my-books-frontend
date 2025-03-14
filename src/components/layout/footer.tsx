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
            <Button
              className="rounded-full"
              variant="ghost"
              size="icon"
              aria-label="Youtube"
            >
              <YoutubeIcon className="size-5" />
            </Button>
            <Button
              className="rounded-full"
              variant="ghost"
              size="icon"
              aria-label="Twitter"
            >
              <TwitterIcon className="size-5" />
            </Button>
            <Button
              className="rounded-full"
              variant="ghost"
              size="icon"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-5" />
            </Button>
            <Button
              className="rounded-full"
              variant="ghost"
              size="icon"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-5" />
            </Button>
          </div>
          <p className="grid h-7 place-items-center text-sm">© 2025 Xxxxx, Inc.</p>
          <div className="flex justify-center sm:justify-end">
            <Logo size="sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}
