import { Card, CardContent } from '@/components/ui/card';
import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/lib/utils';
import { BaseFont, ThemeColor, TitleFont } from '@/providers/theme-provider';
import React from 'react';

export type ThemeCardProps = {
  id: number;
  themeColor: ThemeColor;
  baseFont: BaseFont;
  titleFont: TitleFont;
  bg: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
};

type Props = {
  card: ThemeCardProps;
  isActive: boolean;
  onClick: () => void;
};

export default function ThemeCard({ card, isActive, onClick }: Props) {
  const { containerRef, createRipple } = useRipple();

  const handleClick = (e: React.MouseEvent) => {
    createRipple(e);
    onClick();
  };

  return (
    <Card
      ref={containerRef}
      className={cn(
        'relative overflow-hidden', // 重要: useRipple()使う場合、relative と overflow-hidden が必須
        'border-transparent hover:cursor-pointer hover:shadow-xl',
        isActive && card.border,
        card.bg
      )}
      onClick={handleClick}
    >
      <CardContent>
        <div className="flex flex-col items-center gap-2 text-sm">
          <div className="flex gap-x-1">
            <div className={cn('size-2 rounded-sm sm:size-3', card.primary)} />
            <div
              className={cn('size-2 rounded-sm sm:size-3', card.secondary)}
            />
            <div className={cn('size-2 rounded-sm sm:size-3', card.accent)} />
            <div
              className={cn('size-2 rounded-sm sm:size-3', card.background)}
            />
          </div>
          <p className="hidden text-nowrap md:block">{card.themeColor}</p>
        </div>
      </CardContent>
    </Card>
  );
}
