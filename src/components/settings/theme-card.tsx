import { Card, CardContent } from '@/components/ui/card';
import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/lib/utils';
import { ThemeCardProps } from '@/routes/settings/page';
import React from 'react';

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
        'relative overflow-hidden border-transparent hover:cursor-pointer hover:shadow-xl',
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
          <p className="hidden text-nowrap md:block">{card.themeName}</p>
        </div>
      </CardContent>
    </Card>
  );
}
