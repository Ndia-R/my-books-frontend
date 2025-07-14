import { Card, CardContent } from '@/components/ui/card';
import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/lib/utils';
import { ThemeStyle, useThemeStyle } from '@/providers/theme-style-provider';
import React from 'react';

export type ThemeCardProps = {
  themeStyle: ThemeStyle;
  title: string;
  bg: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

type Props = {
  card: ThemeCardProps;
};
export default function ThemeCard({ card }: Props) {
  const { themeStyle: currentThemeStyle, setThemeStyle } = useThemeStyle();
  const { containerRef, createRipple } = useRipple();

  const handleClick = (e: React.MouseEvent) => {
    setThemeStyle(card.themeStyle);
    createRipple(e);
  };

  return (
    <Card
      className={cn(
        'transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl',
        'relative overflow-hidden',
        'border-transparent hover:cursor-pointer',
        currentThemeStyle === card.themeStyle && card.border,
        card.bg
      )}
      ref={containerRef}
      onClick={handleClick}
    >
      <CardContent>
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <div className="flex gap-x-1">
            <div className={cn('size-3 rounded-sm', card.primary)} />
            <div className={cn('size-3 rounded-sm', card.secondary)} />
            <div className={cn('size-3 rounded-sm', card.accent)} />
            <div className={cn('size-3 rounded-sm', card.background)} />
          </div>
          <p className="text-nowrap">{card.title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
