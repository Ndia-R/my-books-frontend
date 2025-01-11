import SwipeArea from '@/components/swipe-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/util';
import { CheckIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type AvatarSelectType = {
  index: number;
  avatarUrl: string;
};

type Props = {
  items: AvatarSelectType[];
  defaultSelected: number | undefined;
  onSelected: (index: number) => void;
  itemWidth?: number;
  paddingItem?: number;
  frameWidth?: number;
};

export default function AvatarCarousel({
  items,
  defaultSelected,
  onSelected,
  itemWidth = 100,
  paddingItem = 2,
  frameWidth = 400,
}: Props) {
  const extendedItems = [
    ...items.slice(-paddingItem),
    ...items,
    ...items.slice(0, paddingItem),
  ];

  const carouselRef = useRef<HTMLUListElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [innerIndex, setInnerIndex] = useState(0);
  const [defaultIndex, setDefaultIndex] = useState(0);

  const [isScrolling, setIsScrolling] = useState(false);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    if (defaultSelected !== undefined && !isVisible) {
      setInnerIndex(defaultSelected);
      setCurrentIndex(defaultSelected);
      setDefaultIndex(defaultSelected);

      carouselRef.current!.style.transitionProperty = 'none';
      setTimeout(() => {
        carouselRef.current!.style.transitionProperty = 'transform';
        setIsVisible(true);
      }, 100);
    }
  }, [defaultSelected, isVisible]);

  useEffect(() => {
    setMarginLeft(Math.floor(frameWidth / 2) - Math.floor(itemWidth / 2));
  }, [frameWidth, itemWidth]);

  const handlePrev = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setInnerIndex(innerIndex - 1);
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
    onSelected?.((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    setInnerIndex(innerIndex + 1);
    setCurrentIndex((currentIndex + 1) % items.length);
    onSelected?.((currentIndex + 1) % items.length);
  };

  const handleTransitonEnd = () => {
    if (innerIndex >= 0 && innerIndex < items.length) {
      setIsScrolling(false);
      return;
    }

    const index = innerIndex > items.length - 1 ? 0 : items.length - 1;
    setInnerIndex(index);

    carouselRef.current!.style.transitionProperty = 'none';
    setTimeout(() => {
      carouselRef.current!.style.transitionProperty = 'transform';
      setIsScrolling(false);
    }, 50);
  };

  return (
    <div
      className={cn(
        'flex items-center transition-all duration-75 opacity-0',
        isVisible && 'opacity-100'
      )}
    >
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
                {defaultIndex === item.index && (
                  <div
                    className={cn(
                      'absolute bottom-4 right-0 rounded-full bg-primary text-primary-foreground p-1 transition-all duration-200',
                      currentIndex === item.index && 'bottom-0 -right-4'
                    )}
                  >
                    <CheckIcon className="size-4" />
                  </div>
                )}
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
