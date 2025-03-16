import Logo from '@/components/layout/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';

const SNS_LIST = [
  { label: 'Youtube', icon: YoutubeIcon },
  { label: 'Twitter', icon: TwitterIcon },
  { label: 'Instagram', icon: InstagramIcon },
  { label: 'Facebook', icon: FacebookIcon },
];

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <footer className={cn('bg-card', className)}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex flex-col items-center justify-between py-4 sm:flex-row">
          <ul className="flex">
            {SNS_LIST.map((item) => (
              <li key={item.label}>
                <Button
                  className="rounded-full"
                  variant="ghost"
                  size="icon"
                  aria-label="Youtube"
                >
                  <item.icon className="size-5" />
                </Button>
              </li>
            ))}
          </ul>
          <p className="flex h-7 items-center text-sm">© 2025 Xxxxx, Inc.</p>
          <Logo size="sm" />
        </div>
      </div>
    </footer>
  );
}
