import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { ListIcon } from 'lucide-react';

type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function MyListButton({ className, size = 'md' }: Props) {
  const BUTTON_SIZE = {
    sm: 'size-6',
    md: 'size-8',
    lg: '',
  };
  const ICON_SIZE = {
    sm: 'size-3',
    md: 'size-4',
    lg: '',
  };

  return (
    <div className={className}>
      <Button
        className={cn('rounded-full text-muted-foreground', BUTTON_SIZE[size])}
        variant="ghost"
        size="icon"
      >
        <ListIcon className={ICON_SIZE[size]} />
      </Button>
    </div>
  );
}
