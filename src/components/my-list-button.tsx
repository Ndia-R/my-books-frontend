import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { ListIcon } from 'lucide-react';

type Props = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function MyListButton({ className, size = 'md' }: Props) {
  const buttonSize = size === 'sm' ? 'size-6' : size === 'md' ? 'size-8' : '';
  const iconSize = size === 'sm' ? 'size-3' : size === 'md' ? 'size-4' : '';
  return (
    <div className={className}>
      <Button
        className={cn(buttonSize, 'rounded-full text-muted-foreground')}
        variant="ghost"
        size="icon"
      >
        <ListIcon className={iconSize} />
      </Button>
    </div>
  );
}
