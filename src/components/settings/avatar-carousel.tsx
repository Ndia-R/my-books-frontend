import SwipeArea from '@/components/settings/swipe-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AVATER_IMAGE_MAX_COIUNT, AVATER_IMAGE_URL } from '@/constants/constants';
import { cn } from '@/lib/util';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AVATARS = Array.from({ length: AVATER_IMAGE_MAX_COIUNT }, (_, index) => ({
  index,
  avatarUrl: `${AVATER_IMAGE_URL}/avatar${String(index).padStart(2, '0')}.png`,
}));

type Props = {
  value: string;
  onChange: (avatarUrl: string) => void;
  itemWidth?: number;
  frameWidth?: number;
  paddingItem?: number;
};

export default function AvatarCarousel({
  value,
  onChange,
  itemWidth = 80,
  frameWidth = 220,
  paddingItem = 2,
}: Props) {
  // 配列の最初と最後の切れ目部分にアイテムを追加しておく
  // 循環参照するときの見た目の調整のため
  const extendedItems = [
    ...AVATARS.slice(-paddingItem),
    ...AVATARS,
    ...AVATARS.slice(0, paddingItem),
  ];

  // カルーセルの位置調整用
  const marginLeft = Math.floor(frameWidth / 2) - Math.floor(itemWidth / 2);

  // インデックス番号でカルーセルを制御
  // innerIndexは内部的なインデックスとして使用（スクロールアニメーション用）
  const defaultIndex =
    AVATARS.find((avater) => avater.avatarUrl === value)?.index || AVATARS[0].index;
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [innerIndex, setInnerIndex] = useState(defaultIndex);

  const [isScrolling, setIsScrolling] = useState(false);
  const carouselRef = useRef<HTMLUListElement>(null);

  // 初期値がない（空文字）の場合は０番のアバターをデフォルトとする
  useEffect(() => {
    if (value === '') {
      onChange(AVATARS[0].avatarUrl);
    }
  }, [onChange, value]);

  const handlePrev = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setInnerIndex(innerIndex - 1);

    const prevIndex = (currentIndex - 1 + AVATARS.length) % AVATARS.length;
    setCurrentIndex(prevIndex);
    onChange(AVATARS[prevIndex].avatarUrl);
  };

  const handleNext = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setInnerIndex(innerIndex + 1);

    const nextIndex = (currentIndex + 1) % AVATARS.length;
    setCurrentIndex(nextIndex);
    onChange(AVATARS[nextIndex].avatarUrl);
  };

  const handleTransitonEnd = () => {
    setIsScrolling(false);
    setInnerIndex(currentIndex);

    // 循環スクロールのために、先頭から終端などに座標を変化させるとスクロールの
    // ちらつきが発生してしまうので、切れ目の変化ではアニメーションをいったんOffにする
    if (currentIndex === 0 || currentIndex === AVATARS.length - 1) {
      setIsScrolling(true);
      carouselRef.current!.style.transitionProperty = 'none';
      setTimeout(() => {
        carouselRef.current!.style.transitionProperty = 'transform';
        setIsScrolling(false);
      }, 75);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        className="rounded-full"
        type="button"
        variant="ghost"
        size="icon"
        onClick={handlePrev}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div
        className="relative w-full select-none overflow-hidden"
        style={{ width: `${frameWidth}px` }}
      >
        <ul
          ref={carouselRef}
          className="flex transition-transform duration-200"
          style={{
            transform: `translateX(-${(innerIndex + paddingItem) * itemWidth}px)`,
            marginLeft: `${marginLeft}px`,
          }}
          onTransitionEnd={handleTransitonEnd}
        >
          {extendedItems.map((item, index) => (
            <li
              key={index}
              className={`flex shrink-0 items-center justify-center`}
              style={{ width: `${itemWidth}px` }}
            >
              <div className="relative flex h-24 items-center">
                <Avatar
                  className={cn(
                    'transition-all duration-200',
                    'size-14 opacity-25 scale-100',
                    currentIndex === item.index &&
                      'opacity-100 scale-150 outline-1 outline-offset-1 outline outline-primary'
                  )}
                >
                  <AvatarImage
                    className="bg-primary"
                    src={item.avatarUrl}
                    alt="avatar-image"
                    draggable={false}
                  />
                </Avatar>
              </div>
            </li>
          ))}
        </ul>
        <SwipeArea
          className="absolute left-0 top-0 h-24 w-full"
          onSwipeLeft={handleNext}
          onSwipeRight={handlePrev}
        />
      </div>

      <Button
        className="rounded-full"
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleNext}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
