import { cn } from '@/lib/util';
import React, {
  createContext,
  DialogHTMLAttributes,
  MouseEvent,
  ReactNode,
  TransitionEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface DialogContextType {
  openDialog: () => void;
  closeDialog: () => void;
  isOpen: boolean;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function Dialog({
  className,
  children,
  open,
  onOpenChange,
  ...props
}: DialogProps) {
  // 外部からのopen状態を優先し、指定がない場合は内部状態を利用
  const [isOpen, setIsOpen] = useState(open ?? false);

  // openが更新されたら内部状態も更新
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setIsOpen(true);
    }
  }, [onOpenChange]);

  const closeDialog = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
  }, [onOpenChange]);

  // 閉じるアニメーションが終わったときにDialogをcloseする
  // dialogRef.current?.close()のタイミングが早すぎてパッと消えてしまうのを防ぐ
  const handleTransitionEnd = (e: TransitionEvent) => {
    if (!isOpen && e.propertyName) {
      dialogRef.current?.close();
    }
  };

  // バックドロップクリックで閉じる
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (e.target === dialogRef.current) {
        closeDialog();
      }
    },
    [closeDialog]
  );

  // ESCキーで閉じるための関数とイベントリスナーの登録
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDialog();
      }
    },
    [closeDialog, isOpen]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // 子要素を分割
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DialogTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DialogContent
  );

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {trigger}
      {isOpen && <div className="fixed inset-0 z-50 bg-black/60" />}
      <dialog
        className={cn(
          'fixed w-[300px] rounded-lg bg-background p-4 text-foreground',
          'transition-all duration-200',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
          className
        )}
        ref={dialogRef}
        {...props}
        onClick={handleClickOutside} // バックドロップクリック時の処理
        onTransitionEnd={handleTransitionEnd} // アニメーション終了時の処理
      >
        <div className="relative">{content}</div>
      </dialog>
    </DialogContext.Provider>
  );
}

interface DialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}
export function DialogTrigger({ children, asChild = false }: DialogTriggerProps) {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('DialogTrigger must be used within Dialog');
  }

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: context.openDialog,
    });
  }

  return (
    <button className="cursor-pointer" type="button" onClick={context.openDialog}>
      {children}
    </button>
  );
}

interface DialogContentProps {
  children: ReactNode;
  className?: string;
}
export function DialogContent({ children, className }: DialogContentProps) {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('DialogContent must be used within Dialog');
  }

  return <div className={cn('relative', className)}>{children}</div>;
}

interface DialogHeaderProps {
  children: ReactNode;
  className?: string;
}
export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div className={cn('mb-4 flex items-center justify-between', className)}>
      {children}
    </div>
  );
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}
export function DialogTitle({ children, className }: DialogTitleProps) {
  return <h2 className={cn('text-lg font-semibold', className)}>{children}</h2>;
}

interface DialogCloseProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
export function DialogClose({ children, className, onClick }: DialogCloseProps) {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('DialogClose must be used within Dialog');
  }

  const handleClick = () => {
    onClick?.();
    context.closeDialog();
  };

  return (
    <button
      className={cn('hover:opacity-80 transition-opacity', className)}
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
