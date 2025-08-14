import { useCallback, useEffect, useRef } from 'react';

/**
 * Intersection Observer APIを使用して、要素が画面内に入った時にコールバックを実行するカスタムフック
 * @param callback 要素が画面内に入った時に実行する関数
 * @param enabled オブザーバーを有効にするかどうか
 * @param threshold 要素のどの程度が見えた時にトリガーするか（0.0-1.0）
 * @returns 監視対象の要素にアタッチするref
 */
export const useIntersectionObserver = (
  callback: () => void,
  enabled: boolean = true,
  threshold: number = 0.1
) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stableCallback();
        }
      },
      { threshold }
    );

    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [stableCallback, enabled, threshold]);

  return targetRef;
};
