import { cn } from '@/lib/util';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface DialogContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

// ----------------------------------------------------------------------------
// Dialog
// ----------------------------------------------------------------------------
interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Dialog = ({ children, open, onOpenChange }: DialogProps) => {
  // 外部からのopen状態を優先し、指定がない場合は内部状態を利用
  const [isOpen, setIsOpen] = useState(open ?? false);

  // propsのopenが更新されたら内部状態も更新
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const openDialog = useCallback(() => {
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

  return (
    <DialogContext.Provider value={{ isOpen, openDialog, closeDialog }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case DialogTrigger:
            case DialogContent:
              return child;
            default:
              return null;
          }
        }
      })}
    </DialogContext.Provider>
  );
};

// ----------------------------------------------------------------------------
// DialogTrigger
// ----------------------------------------------------------------------------
interface DialogTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const context = useContext(DialogContext);

    if (!context) {
      throw new Error('DialogTrigger must be used within Dialog');
    }

    if (asChild && React.isValidElement(children)) {
      const mergeChildProps = {
        ...props,
        ...children.props,
        onClick: (e: React.MouseEvent) => {
          if (children.props.onClick) {
            children.props.onClick(e);
          }
          context.openDialog();
        },
      };
      return React.cloneElement(children, { ...mergeChildProps, ref });
    }

    const mergeProps = {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) {
          props.onClick(e);
        }
        context.openDialog();
      },
    };

    return (
      <button ref={ref} {...mergeProps}>
        {children}
      </button>
    );
  }
);

// ----------------------------------------------------------------------------
// DialogOverlay
// ----------------------------------------------------------------------------
type DialogOverlayProps = React.HTMLAttributes<HTMLDivElement>;

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('DialogOverlay must be used within Dialog');
  }

  // 閉じるアニメーションが終わった時にopacity:0にする
  // data-[state=closed]でopacity:0へのアニメーションはするが、
  // それが終わるとopacity:1へリセットされてしまい、ちらつくので
  // これを防ぐ
  const ref = useRef<HTMLDivElement | null>(null);
  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'exit' && ref.current) {
      ref.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      data-state={context.isOpen ? 'open' : 'closed'}
      {...props}
      onAnimationEnd={handleAnimationEnd}
    ></div>
  );
};

// ----------------------------------------------------------------------------
// DialogContent
// ----------------------------------------------------------------------------
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onEscapeKeyDown?: () => void;
  onPointerDownOutside?: () => void;
}
const DialogContent = ({
  className,
  children,
  onEscapeKeyDown,
  onPointerDownOutside,
  ...props
}: DialogContentProps) => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('DialogContent must be used within Dialog');
  }

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (context.isOpen) {
      setIsVisible(true);
    }
  }, [context.isOpen]);

  useEffect(() => {
    // ESCキーで閉じるための関数とイベントリスナーの登録
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && context.isOpen) {
        if (onEscapeKeyDown) {
          onEscapeKeyDown();
        } else {
          context.closeDialog();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [context, onEscapeKeyDown]);

  // バックドロップクリックで閉じる
  const handleClickOutside = () => {
    context.closeDialog();
  };

  // 閉じるアニメーションが終わった時にopacity:0にする
  // data-[state=closed]でopacity:0へのアニメーションはするが、
  // それが終わるとopacity:1へリセットされてしまい、ちらつくので
  // これを防ぐ
  const ref = useRef<HTMLDivElement | null>(null);
  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'exit' && ref.current) {
      ref.current.style.opacity = '0';
      setIsVisible(false);
    }
  };

  const mergeProps = {
    ...props,
    onAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => {
      if (props.onAnimationEnd) {
        props.onAnimationEnd(e);
      }
      handleAnimationEnd(e);
    },
  };

  return ReactDOM.createPortal(
    <>
      {isVisible && (
        <>
          <DialogOverlay onClick={onPointerDownOutside || handleClickOutside} />
          <div
            ref={ref}
            className={cn(
              'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
              className
            )}
            data-state={context.isOpen ? 'open' : 'closed'}
            {...mergeProps}
          >
            {children}
          </div>
        </>
      )}
    </>,
    document.body
  );
};

// ----------------------------------------------------------------------------
// DialogHeader
// ----------------------------------------------------------------------------
const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
);

// ----------------------------------------------------------------------------
// DialogFooter
// ----------------------------------------------------------------------------
const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);

// ----------------------------------------------------------------------------
// DialogTitle
// ----------------------------------------------------------------------------
type DialogTitleProps = React.HTMLAttributes<HTMLDivElement>;
const DialogTitle = React.forwardRef<HTMLDivElement, DialogTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
      />
    );
  }
);

// ----------------------------------------------------------------------------
// DialogDescription
// ----------------------------------------------------------------------------
type DialogDescriptionProps = React.HTMLAttributes<HTMLDivElement>;
const DialogDescription = React.forwardRef<HTMLDivElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
      />
    );
  }
);

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
};
