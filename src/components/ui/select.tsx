import { cn } from '@/lib/util';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

type SelectSideType = 'top' | 'right' | 'bottom' | 'left';

const DEFAULT_SIDE: SelectSideType = 'bottom';
const DEFAULT_SIDE_OFFSET = 4;

interface SelectContextType {
  isOpen: boolean;
  openSelect: () => void;
  closeSelect: () => void;
  triggerRef: React.MutableRefObject<HTMLDivElement | HTMLButtonElement | null>;
  innerValue: string;
  setValue: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

// ----------------------------------------------------------------------------
// Select
// ----------------------------------------------------------------------------
interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Select = ({ children, open, onOpenChange, value, onValueChange }: SelectProps) => {
  // 外部からの状態を優先し、指定がない場合は内部状態を利用
  const [isOpen, setIsOpen] = useState(open ?? false);
  const [innerValue, setInnerValue] = useState(value ?? '');

  // propsが更新されたら内部状態も更新
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  useEffect(() => {
    if (value !== undefined) {
      setInnerValue(value);
    }
  }, [value]);

  const openSelect = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setIsOpen(true);
    }
  }, [onOpenChange]);

  const closeSelect = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
  }, [onOpenChange]);

  const setValue = useCallback(
    (value: string) => {
      if (onValueChange) {
        onValueChange(value);
      } else {
        setInnerValue(value);
      }
    },
    [onValueChange]
  );

  const triggerRef = useRef<HTMLDivElement | null>(null);

  return (
    <SelectContext.Provider
      value={{ isOpen, openSelect, closeSelect, triggerRef, innerValue, setValue }}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case SelectTrigger:
            case SelectContent:
              return child;
            default:
              return null;
          }
        }
      })}
    </SelectContext.Provider>
  );
};

// ----------------------------------------------------------------------------
// SelectTrigger
// ----------------------------------------------------------------------------
interface SelectTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const context = useContext(SelectContext);
    if (!context) throw new Error('SelectContent must be used within Select');

    if (asChild && React.isValidElement(children)) {
      const mergeChildProps = {
        ...children.props,
        onClick: (e: React.MouseEvent) => {
          children.props.onClick?.(e);
          context.openSelect();
        },
      };
      return (
        <div
          ref={context.triggerRef as React.MutableRefObject<HTMLDivElement>}
          className={cn('w-fit', className)}
        >
          {React.cloneElement(children, { ...mergeChildProps, ref })}
        </div>
      );
    }

    const mergeProps = {
      ...props,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onClick?.(e);
        context.openSelect();
      },
    };

    return (
      <button
        ref={context.triggerRef as React.MutableRefObject<HTMLButtonElement>}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          className
        )}
        {...mergeProps}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            switch (child.type) {
              case SelectValue:
                return child;
              default:
                return null;
            }
          }
        })}
        <ChevronDownIcon className="size-4 opacity-50" />
      </button>
    );
  }
);

// ----------------------------------------------------------------------------
// SelectContent
// ----------------------------------------------------------------------------
interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'item-aligned' | 'popper';
  side?: SelectSideType;
  sideOffset?: number;
  onEscapeKeyDown?: () => void;
  onPointerDownOutside?: () => void;
}

const SelectContent = ({
  children,
  className,
  position = 'item-aligned',
  side = DEFAULT_SIDE,
  sideOffset = DEFAULT_SIDE_OFFSET,
  onEscapeKeyDown,
  onPointerDownOutside,
  ...props
}: SelectContentProps) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectContent must be used within Select');

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
          context.closeSelect();
        }
      }
    };
    const handlePointerDownOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (onPointerDownOutside) {
          onPointerDownOutside();
        } else {
          context.closeSelect();
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
    // triggerとなる要素からSelectを表示する座標を計算する
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
                'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                position === 'popper' &&
                  'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                className
              )}
              style={{ minWidth: `${context.triggerRef.current?.offsetWidth}px` }}
              data-state={context.isOpen ? 'open' : 'closed'}
              data-side={side}
              {...mergeProps}
            >
              <div
                className={cn(
                  'p-1',
                  position === 'popper' &&
                    'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </>,
    document.body
  );
};

// ----------------------------------------------------------------------------
// SelectItem
// ----------------------------------------------------------------------------
interface SelectItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  value?: string;
}
const SelectItem = ({ className, children, value, ...props }: SelectItemProps) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectItem must be used within Select');

  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (context.innerValue === value) {
      ref.current?.focus();
    }
  }, [context.innerValue, value]);

  const mergeProps = {
    ...props,
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onMouseEnter?.(e);
      ref.current?.focus();
    },
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick(e);
        return;
      }
      context.setValue(value ?? '');
      context.closeSelect();
    },
  };

  return (
    <button
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...mergeProps}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        {context.innerValue === value && <CheckIcon className="size-4" />}
      </span>
      {children}
    </button>
  );
};
// ----------------------------------------------------------------------------
// SelectSeparator
// ----------------------------------------------------------------------------
type SelectSeparatorProps = React.HTMLAttributes<HTMLDivElement>;
const SelectSeparator = React.forwardRef<HTMLDivElement, SelectSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
  )
);

// ----------------------------------------------------------------------------
// SelectLabel
// ----------------------------------------------------------------------------
type SelectLabelProps = React.HTMLAttributes<HTMLDivElement>;
const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
      {...props}
    />
  )
);

// ----------------------------------------------------------------------------
// SelectValue
// ----------------------------------------------------------------------------
interface SelectValueProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
}
const SelectValue = React.forwardRef<HTMLDivElement, SelectValueProps>(
  ({ className, placeholder, ...props }, ref) => {
    const context = useContext(SelectContext);
    if (!context) throw new Error('SelectValue must be used within Select');

    return (
      <span ref={ref} className={cn('', className)} {...props}>
        {context.innerValue || placeholder}
      </span>
    );
  }
);

export {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};