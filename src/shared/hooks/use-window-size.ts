import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const useWindowSize = (delay: number = 0) => {
  // 初期値としてwindow.innerWidthとwindow.innerHeightを設定
  // SSR環境では0を使用
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  const handleResize = useDebouncedCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, delay);

  useEffect(() => {
    // リサイズイベントリスナーの登録のみ
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { width, height };
};
