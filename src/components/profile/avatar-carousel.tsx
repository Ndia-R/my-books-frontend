import SwipeArea from '@/components/profile/swipe-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AVATAR_IMAGE_BASE_URL } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AVATAR_PATHS = [...Array(41)].map(
  (_, index) => `/avatar${String(index).padStart(2, '0')}.png`
);

type Props = {
  value: string;
  onChange: (avatarPath: string) => void;
};

export default function AvatarCarousel({ value, onChange }: Props) {
  // 座標など調整用の値
  const itemWidth = 70;
  const frameWidth = 192;
  const paddingItem = 2;
  const marginLeft = Math.floor(frameWidth / 2) - Math.floor(itemWidth / 2);

  // 配列の最初と最後の切れ目部分にアイテムを追加しておく
  // 循環参照するときの見た目の調整のため
  const extendedAvatarPaths = [
    ...AVATAR_PATHS.slice(-paddingItem),
    ...AVATAR_PATHS,
    ...AVATAR_PATHS.slice(0, paddingItem),
  ];

  // 引数のvalueが見つからなかった場合、findIndex()は-1を返すので、
  // Math.max()で最小でも0になるようにする
  const defaultIndex = Math.max(
    0,
    AVATAR_PATHS.findIndex((avatarPath) => avatarPath === value)
  );

  // インデックス番号でカルーセルを制御
  // innerIndexは内部的なインデックスとして使用（スクロールアニメーション用）
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [innerIndex, setInnerIndex] = useState(defaultIndex);

  const [isScrolling, setIsScrolling] = useState(false);
  const carouselRef = useRef<HTMLUListElement>(null);

  // デフォルトのアバターをセット
  useEffect(() => {
    onChange(AVATAR_PATHS[currentIndex]);
  }, [currentIndex, onChange]);

  const handlePrev = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setInnerIndex(innerIndex - 1);

    const prevIndex =
      (currentIndex - 1 + AVATAR_PATHS.length) % AVATAR_PATHS.length;
    setCurrentIndex(prevIndex);
    onChange(AVATAR_PATHS[prevIndex]);
  };

  const handleNext = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setInnerIndex(innerIndex + 1);

    const nextIndex = (currentIndex + 1) % AVATAR_PATHS.length;
    setCurrentIndex(nextIndex);
    onChange(AVATAR_PATHS[nextIndex]);
  };

  const handleTransitonEnd = () => {
    setIsScrolling(false);
    setInnerIndex(currentIndex);

    // 循環スクロールのために、先頭から終端などに座標を変化させるとスクロールの
    // ちらつきが発生してしまうので、切れ目の変化ではアニメーションをいったんOffにする
    if (currentIndex === 0 || currentIndex === AVATAR_PATHS.length - 1) {
      setIsScrolling(true);
      carouselRef.current!.style.transitionProperty = 'none';
      setTimeout(() => {
        carouselRef.current!.style.transitionProperty = 'transform';
        setIsScrolling(false);
      }, 75);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="前へ"
        onClick={handlePrev}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div
        className="relative w-full overflow-hidden select-none"
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
          {extendedAvatarPaths.map((avatarPath, index) => (
            <li
              key={index}
              className={`flex shrink-0 items-center justify-center`}
              style={{ width: `${itemWidth}px` }}
            >
              <div className="relative flex h-24 items-center">
                <Avatar
                  className={cn(
                    'transition-all duration-200',
                    'size-12 scale-100 opacity-25',
                    avatarPath === AVATAR_PATHS[currentIndex] &&
                      'outline-primary scale-150 opacity-100 outline outline-offset-1'
                  )}
                >
                  <AvatarImage
                    className="bg-foreground/30"
                    src={AVATAR_IMAGE_BASE_URL + avatarPath}
                    alt="avatar-image"
                    draggable={false}
                  />
                </Avatar>
              </div>
            </li>
          ))}
        </ul>
        <SwipeArea
          className="absolute top-0 left-0 h-24 w-full"
          onSwipeLeft={handleNext}
          onSwipeRight={handlePrev}
        />
      </div>

      <Button
        className=""
        type="button"
        variant="ghost"
        size="icon"
        aria-label="次へ"
        onClick={handleNext}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
