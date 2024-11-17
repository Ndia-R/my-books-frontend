import { cn } from '@/lib/util';
import { XIcon } from 'lucide-react';
import { AnimationEvent, HTMLAttributes, useEffect, useState } from 'react';

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  duration: number;
  onRemove: () => void;
}

const Toast = ({
  className,
  title,
  description,
  duration,
  onRemove,
  ...props
}: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // アニメーションが終わったときにRemoveする
  // タイミングが早すぎてパッと消えてしまうのを防ぐ
  const handleAnimationEnd = async (e: AnimationEvent<HTMLDivElement>) => {
    if (!isOpen && e.animationName === 'exit') {
      onRemove();
    }
  };

  useEffect(() => {
    setTimeout(() => setIsOpen(false), duration);
  }, [duration]);

  return (
    <div
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        'border bg-background text-foreground',
        'data-[state=closed]:opacity-0',
        className
      )}
      data-state={isOpen ? 'open' : 'closed'}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      <div className="grid gap-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {description && <p className="text-sm opacity-90">{description}</p>}
        <button
          className={cn(
            'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100',
            'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export { Toast };
