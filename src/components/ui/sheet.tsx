import { cn } from '@/lib/util';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type SheetSideType = 'top' | 'right' | 'bottom' | 'left';

const DEFAULT_SIDE: SheetSideType = 'right';
const INVISIBLE_DURATION = 150;

interface SheetContextType {
  isOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

const SheetContext = React.createContext<SheetContextType | undefined>(undefined);

// ----------------------------------------------------------------------------
// Sheet
// ----------------------------------------------------------------------------
interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Sheet = ({ children, open, onOpenChange }: SheetProps) => {
  // 外部からのopen状態を優先し、指定がない場合は内部状態を利用
  const [isOpen, setIsOpen] = useState(open ?? false);

  // propsのopenが更新されたら内部状態も更新
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const openSheet = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setIsOpen(true);
    }
  }, [onOpenChange]);

  const closeSheet = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
  }, [onOpenChange]);

  return (
    <SheetContext.Provider value={{ isOpen, openSheet, closeSheet }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case SheetTrigger:
            case SheetContent:
              return child;
            default:
              return null;
          }
        }
      })}
    </SheetContext.Provider>
  );
};

// ----------------------------------------------------------------------------
// SheetTrigger
// ----------------------------------------------------------------------------
interface SheetTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}
const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const context = useContext(SheetContext);

    if (!context) {
      throw new Error('SheetTrigger must be used within Sheet');
    }

    if (asChild && React.isValidElement(children)) {
      const mergeChildProps = {
        ...props,
        ...children.props,
        onClick: (e: React.MouseEvent) => {
          if (children.props.onClick) {
            children.props.onClick(e);
          }
          context.openSheet();
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
        context.openSheet();
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
// SheetOverlay
// ----------------------------------------------------------------------------
type SheetOverlayProps = React.HTMLAttributes<HTMLDivElement>;

const SheetOverlay = React.forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className, ...props }, ref) => {
    const context = useContext(SheetContext);

    if (!context) {
      throw new Error('SheetOverlay must be used within Sheet');
    }

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          className
        )}
        data-state={context.isOpen ? 'open' : 'closed'}
        {...props}
      ></div>
    );
  }
);

// ----------------------------------------------------------------------------
// SheetContent
// ----------------------------------------------------------------------------
interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: SheetSideType;
}

const POSITION_LIST = {
  top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
  bottom:
    'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
  right:
    'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
};

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side = DEFAULT_SIDE, ...props }, ref) => {
    const context = useContext(SheetContext);

    if (!context) {
      throw new Error('SheetContent must be used within Sheet');
    }

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (context.isOpen) {
        setIsVisible(true);
      } else {
        setTimeout(() => setIsVisible(false), INVISIBLE_DURATION);
      }
    }, [context.isOpen]);

    useEffect(() => {
      // ESCキーで閉じるための関数とイベントリスナーの登録
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && context.isOpen) {
          context.closeSheet();
          setTimeout(() => setIsVisible(false), INVISIBLE_DURATION);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [context]);

    // バックドロップクリックで閉じる
    const handleClickOutside = () => {
      context.closeSheet();
      setTimeout(() => setIsVisible(false), INVISIBLE_DURATION);
    };

    return ReactDOM.createPortal(
      <>
        {isVisible && (
          <>
            <SheetOverlay onClick={handleClickOutside} />
            <div
              ref={ref}
              className={cn(
                'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
                POSITION_LIST[side],
                className
              )}
              data-state={context.isOpen ? 'open' : 'closed'}
              {...props}
            >
              {children}
            </div>
          </>
        )}
      </>,
      document.body
    );
  }
);

export { Sheet, SheetContent, SheetOverlay, SheetTrigger };
