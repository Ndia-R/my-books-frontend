import { cn } from '@/lib/util';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

type DropdownMenuSideType = 'top' | 'right' | 'bottom' | 'left';

const DEFAULT_SIDE: DropdownMenuSideType = 'top';
const DEFAULT_SIDE_OFFSET = 8;

interface DropdownMenuContextType {
  isOpen: boolean;
  openDropdownMenu: () => void;
  closeDropdownMenu: () => void;
  triggerRef: React.MutableRefObject<HTMLDivElement | HTMLButtonElement | null>;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | undefined>(
  undefined
);

// ----------------------------------------------------------------------------
// DropdownMenu
// ----------------------------------------------------------------------------
interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const DropdownMenu = ({ children, open, onOpenChange }: DropdownMenuProps) => {
  // 外部からのopen状態を優先し、指定がない場合は内部状態を利用
  const [isOpen, setIsOpen] = useState(open ?? false);

  // propsのopenが更新されたら内部状態も更新
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  const openDropdownMenu = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setIsOpen(true);
    }
  }, [onOpenChange]);

  const closeDropdownMenu = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
  }, [onOpenChange]);

  const triggerRef = useRef<HTMLDivElement | null>(null);

  return (
    <DropdownMenuContext.Provider
      value={{ isOpen, openDropdownMenu, closeDropdownMenu, triggerRef }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case DropdownMenuTrigger:
            case DropdownMenuContent:
              return child;
            default:
              return null;
          }
        }
      })}
    </DropdownMenuContext.Provider>
  );
};

// ----------------------------------------------------------------------------
// DropdownMenuTrigger
// ----------------------------------------------------------------------------
interface DropdownMenuTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const context = useContext(DropdownMenuContext);
    if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu');

    if (asChild && React.isValidElement(children)) {
      const mergeChildProps = {
        ...children.props,
        onClick: (e: React.MouseEvent) => {
          children.props.onClick?.(e);
          context.openDropdownMenu();
        },
      };
      return (
        <div
          ref={context.triggerRef as React.MutableRefObject<HTMLDivElement>}
          className="w-fit"
          onPointerDown={context.openDropdownMenu}
        >
          {React.cloneElement(children, { ...mergeChildProps, ref })}
        </div>
      );
    }

    const mergeProps = {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);
        context.openDropdownMenu();
      },
    };

    return (
      <button
        ref={context.triggerRef as React.MutableRefObject<HTMLButtonElement>}
        className="w-fit"
        {...mergeProps}
      >
        {children}
      </button>
    );
  }
);

// ----------------------------------------------------------------------------
// DropdownMenuContent
// ----------------------------------------------------------------------------
interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: DropdownMenuSideType;
  sideOffset?: number;
  onEscapeKeyDown?: () => void;
  onPointerDownOutside?: () => void;
}

const DropdownMenuContent = ({
  children,
  className,
  side = DEFAULT_SIDE,
  sideOffset = DEFAULT_SIDE_OFFSET,
  onEscapeKeyDown,
  onPointerDownOutside,
  ...props
}: DropdownMenuContentProps) => {
  const context = useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuContent must be used within DropdownMenu');

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
          context.closeDropdownMenu();
        }
      }
    };
    const handlePointerDownOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (onPointerDownOutside) {
          onPointerDownOutside();
        } else {
          context.closeDropdownMenu();
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
    // triggerとなる要素からDropdownMenuを表示する座標を計算する
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
                'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
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

// ----------------------------------------------------------------------------
// DropdownMenuItem
// ----------------------------------------------------------------------------
interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
}
const DropdownMenuItem = ({
  className,
  children,
  inset,
  ...props
}: DropdownMenuItemProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <button
      ref={ref}
      className={cn(
        'relative w-full flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        inset && 'pl-8',
        className
      )}
      {...props}
      onMouseEnter={() => ref.current?.focus()}
    >
      {children}
    </button>
  );
};
// ----------------------------------------------------------------------------
// DropdownMenuSeparator
// ----------------------------------------------------------------------------
type DropdownMenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>;
const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));

// ----------------------------------------------------------------------------
// DropdownMenuLabel
// ----------------------------------------------------------------------------
interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
}
const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
