import { cn } from '@/lib/util';
import {
  Children,
  cloneElement,
  createContext,
  HTMLAttributes,
  isValidElement,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

type TooltipSideType = 'top' | 'bottom' | 'left' | 'right';

interface TooltipContextType {
  openTooltip: () => void;
  closeTooltip: () => void;
  isOpen: boolean;
  side: TooltipSideType;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  side?: TooltipSideType;
  sideOffset?: number;
}

const Tooltip = ({
  className,
  children,
  side = 'top',
  sideOffset = 8,
  ...props
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');

  const ref = useRef<HTMLDivElement | null>(null);

  const openTooltip = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeTooltip = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 子要素を分割
  const trigger = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === TooltipTrigger
  );
  const content = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === TooltipContent
  );

  const handleMouseEnter = () => {
    if (ref && ref.current) {
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
    }
  };

  return (
    <TooltipContext.Provider value={{ openTooltip, closeTooltip, isOpen, side }}>
      <div ref={ref} onMouseEnter={handleMouseEnter}>
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn('z-50 fixed top-0 left-0', className)}
          style={{ transform: transformStyle }}
          {...props}
        >
          {content}
        </div>
      )}
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}
const TooltipTrigger = ({ children, asChild = false }: TooltipTriggerProps) => {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error('TooltipTrigger must be used within Tooltip');
  }

  if (asChild) {
    return cloneElement(children as React.ReactElement, {
      onMouseEnter: context.openTooltip,
      onMouseLeave: context.closeTooltip,
      onClick: context.closeTooltip,
    });
  }

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={context.openTooltip}
      onMouseLeave={context.closeTooltip}
      onClick={context.closeTooltip}
    >
      {children}
    </div>
  );
};

interface TooltipContentProps {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  side?: TooltipSideType;
}
const TooltipContent = ({ children, className }: TooltipContentProps) => {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error('TooltipContent must be used within Tooltip');
  }

  return (
    <div
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      data-state={context.isOpen ? 'open' : 'closed'}
      data-side={context.side}
    >
      {children}
    </div>
  );
};

export { Tooltip, TooltipContent, TooltipTrigger };
