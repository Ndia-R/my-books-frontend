import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden", // overflow-hidden と relative を追加
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

// リップルエフェクトの設定用フック
const useRipple = () => {
  const [ripples, setRipples] = React.useState<
    Array<{ x: number; y: number; size: number; id: number }>
  >([]);
  const nextId = React.useRef(0);

  const addRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    // クリック位置を計算
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // ボタンの対角線の長さを計算（波紋の最大サイズ）
    const size = Math.max(rect.width, rect.height) * 2;

    // 新しいリップルを追加
    const newRipple = { x, y, size, id: nextId.current };
    nextId.current += 1;

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    // アニメーション後にリップルを削除
    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((ripple) => ripple.id !== newRipple.id)
      );
    }, 600); // アニメーションの持続時間に合わせる
  };

  return { ripples, addRipple };
};

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
  const Comp = asChild ? Slot : 'button';
  const { ripples, addRipple } = useRipple();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // 元のonClickがあれば実行
    if (props.onClick) {
      props.onClick(event);
    }
    // リップルエフェクトを追加
    addRipple(event);
  };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      onClick={handleClick}
    >
      {children}
      {/* リップルエフェクト要素 */}
      {/* {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white pointer-events-none opacity-25 animate-ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))} */}
    </Comp>
  );
}

export { Button, buttonVariants };

// import { Slot } from '@radix-ui/react-slot';
// import { cva, type VariantProps } from 'class-variance-authority';
// import * as React from 'react';

// import { cn } from '@/lib/utils';

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//   {
//     variants: {
//       variant: {
//         default:
//           'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
//         destructive:
//           'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
//         outline:
//           'border border-primary/50 text-primary bg-transparent hover:bg-primary/20 hover:border-primary',
//         secondary:
//           'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
//         ghost:
//           'border border-transparent bg-transparent text-foreground hover:bg-primary/20 hover:text-primary',
//         link: 'relative [&>*]:relative [&>*]:inline-block [&>*]:after:absolute [&>*]:after:-bottom-1 [&>*]:after:left-0 [&>*]:after:h-0.5 [&>*]:after:w-0 [&>*]:after:bg-primary [&>*]:after:transition-all [&>*]:after:duration-300 hover:[&>*]:after:w-full',
//       },
//       size: {
//         default: 'h-9 px-4 py-2 has-[>svg]:px-3',
//         sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
//         lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
//         icon: 'size-9',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//       size: 'default',
//     },
//   }
// );

// function Button({
//   className,
//   variant,
//   size,
//   asChild = false,
//   children,
//   ...props
// }: React.ComponentProps<'button'> &
//   VariantProps<typeof buttonVariants> & {
//     asChild?: boolean;
//   }) {
//   const Comp = asChild ? Slot : 'button';

//   // テキストノードのみの場合は自動的にspanで囲む
//   let content = children;
//   if (variant === 'link') {
//     content = <span>{children}</span>;
//   }

//   return (
//     <Comp
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size, className }))}
//       {...props}
//     >
//       {content}
//     </Comp>
//   );
// }

// export { Button, buttonVariants };
