import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-primary/50 text-primary bg-transparent hover:bg-primary/20 hover:border-primary',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'border border-transparent bg-transparent text-foreground hover:bg-primary/20 hover:text-primary',
        link: 'relative [&>*]:relative [&>*]:inline-block [&>*]:after:absolute [&>*]:after:-bottom-1 [&>*]:after:left-0 [&>*]:after:h-0.5 [&>*]:after:w-0 [&>*]:after:bg-primary [&>*]:after:transition-all [&>*]:after:duration-300 hover:[&>*]:after:w-full',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const { containerRef, createRipple } = useRipple();

  const Comp = asChild ? Slot : 'button';

  // テキストノードのみの場合は自動的にspanで囲む
  let content = children;
  if (variant === 'link') {
    content = <span>{children}</span>;
  }

  return (
    <Comp
      ref={containerRef as React.Ref<HTMLButtonElement>}
      onClick={(e) => {
        createRipple(e);
      }}
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        'relative overflow-hidden'
      )}
      {...props}
    >
      {content}
    </Comp>
  );
}

export { Button, buttonVariants };
