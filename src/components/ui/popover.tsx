import { cn } from '@/lib/util';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

type PopoverSideType = 'top' | 'right' | 'bottom' | 'left';

const DEFAULT_SIDE: PopoverSideType = 'top';
const DEFAULT_SIDE_OFFSET = 8;

interface PopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  triggerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const PopoverContext = React.createContext<PopoverContextType | undefined>(undefined);

// ----------------------------------------------------------------------------
// Popover
// ----------------------------------------------------------------------------
interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Popover = ({ children, open, onOpenChange }: PopoverProps) => {
  // 外部からのopen状態を優先し、指定がない場合は内部状態を利用
  const [isOpen, setIsOpen] = useState(open ?? false);

  // propsのopenが更新されたら内部状態も更新
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const openPopover = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setIsOpen(true);
    }
  }, [onOpenChange]);

  const closePopover = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
  }, [onOpenChange]);

  const triggerRef = useRef<HTMLDivElement | null>(null);

  return (
    <PopoverContext.Provider value={{ isOpen, openPopover, closePopover, triggerRef }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case PopoverTrigger:
            case PopoverContent:
              return child;
            default:
              return null;
          }
        }
      })}
    </PopoverContext.Provider>
  );
};

// ----------------------------------------------------------------------------
// PopoverTrigger
// ----------------------------------------------------------------------------
interface PopoverTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const context = useContext(PopoverContext);
    if (!context) throw new Error('PopoverContent must be used within Popover');

    if (asChild && React.isValidElement(children)) {
      const mergeChildProps = {
        ...children.props,
        onClick: (e: React.MouseEvent) => {
          children.props.onClick?.(e);
          context.openPopover();
        },
      };
      return (
        <div ref={context.triggerRef}>
          {React.cloneElement(children, { ...mergeChildProps, ref })}
        </div>
      );
    }

    const mergeProps = {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);
        context.openPopover();
      },
    };

    return (
      <div ref={context.triggerRef}>
        <button ref={ref} {...mergeProps}>
          {children}
        </button>
      </div>
    );
  }
);

// ----------------------------------------------------------------------------
// PopoverContent
// ----------------------------------------------------------------------------
interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: PopoverSideType;
  sideOffset?: number;
  onEscapeKeyDown?: () => void;
  onPointerDownOutside?: () => void;
}

const PopoverContent = ({
  children,
  className,
  side = DEFAULT_SIDE,
  sideOffset = DEFAULT_SIDE_OFFSET,
  onEscapeKeyDown,
  onPointerDownOutside,
  ...props
}: PopoverContentProps) => {
  const context = useContext(PopoverContext);
  if (!context) throw new Error('PopoverContent must be used within Popover');

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleWheel = (e: MouseEvent) => {
      e.preventDefault();
    };

    if (context.isOpen) {
      setIsVisible(true);
      document.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [context.isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && context.isOpen) {
        if (onEscapeKeyDown) {
          onEscapeKeyDown();
        } else {
          context.closePopover();
        }
      }
    };
    const handlePointerDownOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (onPointerDownOutside) {
          onPointerDownOutside();
        } else {
          context.closePopover();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDownOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDownOutside);
    };
  }, [context, onEscapeKeyDown, onPointerDownOutside]);

  // 閉じるアニメーションが終わった時にopacity:0にする
  // data-[state=closed]でopacity:0へのアニメーションはするが、
  // それが終わるとopacity:1へリセットされてしまい、ちらつくので
  // これを防ぐためにdisplay:'none'にする
  const ref = useRef<HTMLDivElement | null>(null);
  const handleAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === 'exit' && ref.current) {
      ref.current.style.display = 'none';
      setIsVisible(false);
    }
  };

  const mergeProps = {
    ...props,
    onAnimationEnd: (e: React.AnimationEvent<HTMLDivElement>) => {
      props.onAnimationEnd?.(e);
      handleAnimationEnd(e);
    },
  };

  const [transformStyle, setTransformStyle] = useState('');

  useEffect(() => {
    // triggerとなる要素からPopoverを表示する座標を計算する
    // （style属性に指定する文字列作成）
    if (context.triggerRef.current) {
      const { left, top, right, bottom, width, height } =
        context.triggerRef.current.getBoundingClientRect();
      const positions = {
        top: {
          x: left + width / 2,
          y: top,
          offset: { x: '-50%', y: `-100% - ${sideOffset}px` },
        },
        bottom: {
          x: left + width / 2,
          y: bottom,
          offset: { x: '-50%', y: `0% + ${sideOffset}px` },
        },
        left: {
          x: left,
          y: top + height / 2,
          offset: { x: `-100% - ${sideOffset}px`, y: '-50%' },
        },
        right: {
          x: right,
          y: top + height / 2,
          offset: { x: `0% + ${sideOffset}px`, y: '-50%' },
        },
      };
      const pos = positions[side];

      setTransformStyle(
        `translate(calc(${pos.x}px + ${pos.offset.x}), calc(${pos.y}px + ${pos.offset.y}))`
      );
    }
  }, [context, context.triggerRef, side, sideOffset]);

  return ReactDOM.createPortal(
    <>
      {isVisible && (
        <>
          <div className="fixed left-0 top-0 z-50" style={{ transform: transformStyle }}>
            <div
              ref={ref}
              className={cn(
                'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className
              )}
              data-state={context.isOpen ? 'open' : 'closed'}
              data-side={side}
              {...mergeProps}
            >
              {children}
            </div>
          </div>
        </>
      )}
    </>,
    document.body
  );
};

export { Popover, PopoverContent, PopoverTrigger };
