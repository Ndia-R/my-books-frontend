import { cn } from '@/lib/util';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

type TooltipSideType = 'top' | 'right' | 'bottom' | 'left';

const DEFAULT_SIDE: TooltipSideType = 'top';
const DEFAULT_SIDE_OFFSET = 8;

interface TooltipContextType {
  isOpen: boolean;
  openTooltip: () => void;
  closeTooltip: () => void;
  triggerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);

// ----------------------------------------------------------------------------
// Tooltip
// ----------------------------------------------------------------------------
interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Tooltip = ({ children, open, onOpenChange }: TooltipProps) => {
  // 外部からのopen状態を優先し、指定がない場合は内部状態を利用
  const [isOpen, setIsOpen] = useState(open ?? false);

  // propsのopenが更新されたら内部状態も更新
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const openTooltip = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setIsOpen(true);
    }
  }, [onOpenChange]);

  const closeTooltip = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
  }, [onOpenChange]);

  const triggerRef = useRef<HTMLDivElement | null>(null);

  return (
    <TooltipContext.Provider value={{ isOpen, openTooltip, closeTooltip, triggerRef }}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case TooltipTrigger:
            case TooltipContent:
              return child;
            default:
              return null;
          }
        }
      })}
    </TooltipContext.Provider>
  );
};

// ----------------------------------------------------------------------------
// TooltipTrigger
// ----------------------------------------------------------------------------
interface TooltipTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const context = useContext(TooltipContext);

    if (!context) {
      throw new Error('TooltipContent must be used within Tooltip');
    }

    if (asChild && React.isValidElement(children)) {
      const mergeChildProps = {
        ...props,
        ...children.props,
      };
      return (
        <div
          ref={context.triggerRef}
          onPointerEnter={context.openTooltip}
          onPointerLeave={context.closeTooltip}
          onPointerDown={context.closeTooltip}
        >
          {React.cloneElement(children, { ...mergeChildProps, ref })}
        </div>
      );
    }

    return (
      <div
        ref={context.triggerRef}
        onPointerEnter={context.openTooltip}
        onPointerLeave={context.closeTooltip}
        onPointerDown={context.closeTooltip}
      >
        <button ref={ref} {...props}>
          {children}
        </button>
      </div>
    );
  }
);

// ----------------------------------------------------------------------------
// TooltipContent
// ----------------------------------------------------------------------------
interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: TooltipSideType;
  sideOffset?: number;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      children,
      className,
      side = DEFAULT_SIDE,
      sideOffset = DEFAULT_SIDE_OFFSET,
      ...props
    },
    ref
  ) => {
    const context = useContext(TooltipContext);

    if (!context) {
      throw new Error('TooltipContent must be used within Tooltip');
    }

    const [transformStyle, setTransformStyle] = useState('');

    useEffect(() => {
      // triggerとなる要素からTooltipを表示する座標を計算する
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

    return (
      <>
        {context.isOpen && (
          <div className="fixed left-0 top-0 z-50" style={{ transform: transformStyle }}>
            <div
              ref={ref}
              className={cn(
                'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className
              )}
              data-state={context.isOpen ? 'open' : 'closed'}
              data-side={side}
              {...props}
            >
              {children}
            </div>
          </div>
        )}
      </>
    );
  }
);

export { Tooltip, TooltipContent, TooltipTrigger };
