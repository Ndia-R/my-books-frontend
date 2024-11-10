import { cn } from '@/lib/util';
import React, {
  createContext,
  HTMLAttributes,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface DrawerContextType {
  openDrawer: () => void;
  closeDrawer: () => void;
  isOpen: boolean;
  title?: string;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  side?: 'left' | 'right';
}

export function Drawer({
  className,
  children,
  open,
  onOpenChange,
  side = 'left',
  ...props
}: DrawerProps) {
  // 外部からのopen状態を優先し、指定がない場合は内部状態を利用
  const [isOpen, setIsOpen] = useState(open ?? false);

  // openが更新されたら内部状態も更新
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const openDrawer = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setIsOpen(true);
    }
  }, [onOpenChange]);

  const closeDrawer = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
  }, [onOpenChange]);

  // バックドロップクリックで閉じる
  const handleClickOutside = () => {
    closeDrawer();
  };

  // ESCキーで閉じるための関数とイベントリスナーの登録
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDrawer();
      }
    },
    [closeDrawer, isOpen]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // 子要素を分割
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DrawerTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DrawerContent
  );

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, isOpen }}>
      {trigger}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 h-screen w-screen bg-black/60"
          onClick={handleClickOutside} // バックドロップクリック時の処理
        />
      )}
      <div
        className={cn(
          'fixed top-0 z-50 h-screen bg-background',
          'transition-all duration-200',
          side === 'left' ? 'left-0 -translate-x-full' : 'right-0 translate-x-full',
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0',
          className
        )}
        {...props}
      >
        <div className="relative">{content}</div>
      </div>
    </DrawerContext.Provider>
  );
}

interface DrawerTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}
export function DrawerTrigger({ children, asChild = false }: DrawerTriggerProps) {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('DrawerTrigger must be used within Drawer');
  }

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: context.openDrawer,
    });
  }

  return (
    <button className="cursor-pointer" type="button" onClick={context.openDrawer}>
      {children}
    </button>
  );
}

interface DrawerContentProps {
  children: ReactNode;
  className?: string;
}
export function DrawerContent({ children, className }: DrawerContentProps) {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('DrawerContent must be used within Drawer');
  }

  return <div className={cn('relative', className)}>{children}</div>;
}
