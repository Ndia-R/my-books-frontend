import { cn } from '@/lib/util';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

type TooltipSideType = 'top' | 'right' | 'bottom' | 'left';

const DEFAULT_SIDE: TooltipSideType = 'top';
const DEFAULT_SIDE_OFFSET = 8;

interface TooltipContextType {
  openTooltip: () => void;
  closeTooltip: () => void;
  isOpen: boolean;
  setSide: (value: TooltipSideType) => void;
  setSideOffset: (value: number) => void;
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);

// ----------------------------------------------------------------------------
// Tooltip
// ----------------------------------------------------------------------------
interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Tooltip = ({ className, children, open, onOpenChange }: TooltipProps) => {
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

  // Tooltipを表示する方向とオフセット
  const [side, setSide] = useState<TooltipSideType>(DEFAULT_SIDE);
  const [sideOffset, setSideOffset] = useState(DEFAULT_SIDE_OFFSET);

  // ポインタ（マウス、ペン、タッチ）が要素内に入った時のイベントで
  // Tooltipを表示する座標の計算（style属性に指定する文字列作成）
  const ref = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState('');
  const handlePointerEnter = () => {
    if (ref.current) {
      const { left, top, right, bottom, width, height } =
        ref.current.getBoundingClientRect();
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

      openTooltip();
    }
  };

  const handlePointerLeave = () => {
    closeTooltip();
  };

  const handlePointerDown = () => {
    closeTooltip();
  };

  // 子要素を分割
  const trigger = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TooltipTrigger
  );
  const content = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TooltipContent
  );

  return (
    <TooltipContext.Provider
      value={{ openTooltip, closeTooltip, isOpen, setSide, setSideOffset }}
    >
      <div
        ref={ref}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          className={cn('z-50 fixed top-0 left-0', className)}
          style={{ transform: transformStyle }}
        >
          {content}
        </div>
      )}
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
    if (asChild && React.isValidElement(children)) {
      const mergeChildProps = {
        ...props,
        ...children.props,
      };
      return React.cloneElement(children, { ...mergeChildProps, ref });
    }

    return (
      <button ref={ref} {...props}>
        {children}
      </button>
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

    useEffect(() => {
      context.setSide(side);
      context.setSideOffset(sideOffset);
    }, [context, side, sideOffset]);

    return (
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
    );
  }
);

export { Tooltip, TooltipContent, TooltipTrigger };
