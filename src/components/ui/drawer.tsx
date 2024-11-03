import { cn } from '@/lib/util';
import { HTMLAttributes, useEffect } from 'react';

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  side?: 'left' | 'right';
  onClose?: () => void;
}

export default function Drawer({
  open,
  side = 'left',
  onClose,
  className,
  children,
  ...props
}: DrawerProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        if (onClose !== undefined) {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, open]);

  return (
    <>
      {open && (
        <div
          className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/70"
          onClick={onClose}
        />
      )}
      <div
        className={cn(
          'fixed top-0 z-50 h-screen bg-background transition-transform',
          side === 'left' ? 'left-0' : 'right-0',
          open
            ? 'translate-x-0'
            : side === 'left'
              ? '-translate-x-full'
              : 'translate-x-full',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
