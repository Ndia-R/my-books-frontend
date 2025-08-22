import Logo from '@/components/layout/logo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuItem } from '@/types';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react';
import { Link } from 'react-router';

const SNS_LIST: MenuItem[] = [
  {
    label: 'Youtube',
    href: 'https://www.youtube.com',
    icon: YoutubeIcon,
  },
  {
    label: 'Twitter',
    href: 'https://x.com',
    icon: TwitterIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com',
    icon: InstagramIcon,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    icon: FacebookIcon,
  },
];

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <footer className={cn('bg-card', className)}>
      <div className="mx-auto max-w-7xl sm:px-6">
        <div className="flex flex-col items-center justify-between py-4 sm:grid sm:grid-cols-3">
          <ul className="flex">
            {SNS_LIST.map((item) => (
              <li key={item.label}>
                <Link
                  className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                  to={item.href}
                  aria-label={`${item.label}のホームページ`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon />
                </Link>
              </li>
            ))}
          </ul>
          <p className="flex items-center justify-center text-sm leading-7">
            © 2025 Xxxxx, Inc.
          </p>
          <div className="flex items-center justify-end">
            <Logo size="sm" />
          </div>
        </div>
      </div>
    </footer>
  );
}
