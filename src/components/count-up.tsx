import { useEffect, useState } from 'react';

type Props = {
  className?: string;
  start?: number;
  end: number;
  minInterval?: number; // 最小間隔
  maxInterval?: number; // 最大間隔
  normalInterval?: number; // 高速カウントアップ時の間隔
  delay?: number; // カウントアップ開始までの遅延時間（ミリ秒）
};

export default function CountUp({
  className,
  start,
  end,
  minInterval = 1,
  maxInterval = 300,
  normalInterval = 1,
  delay = 0, // デフォルトは遅延なし
}: Props) {
  const initialStart = start ?? Math.max(0, end - 50);
  const [count, setCount] = useState(initialStart);
  const [isDelayComplete, setIsDelayComplete] = useState(delay === 0);

  // 遅延処理
  useEffect(() => {
    if (delay === 0) return;

    const delayTimeout = setTimeout(() => {
      setIsDelayComplete(true);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  // イージング関数：最後の10カウント用
  const easeInOut = (progress: number): number => {
    return progress < 0.5
      ? 4 * progress ** 3 // 前半は加速 (ease-in)
      : 1 - Math.pow(-3 * progress + 3, 7) / 2; // 後半を非常に緩やかに減速
  };

  useEffect(() => {
    // 遅延が完了していない場合は何もしない
    if (!isDelayComplete) return;
    if (count >= end) return; // カウント終了

    const isFinalPhase = count >= end - 10; // 最後の10カウントかどうかを判定

    let currentInterval: number;

    if (isFinalPhase) {
      // 最後の10カウントの場合、イージングを適用
      const progress = (count - (end - 10)) / 10; // 進捗率 (0 ~ 1)
      const easedProgress = easeInOut(progress);
      currentInterval = minInterval + (maxInterval - minInterval) * easedProgress;
    } else {
      // 高速カウントアップ
      currentInterval = normalInterval;
    }

    const timeout = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, currentInterval);

    return () => clearTimeout(timeout);
  }, [count, end, minInterval, maxInterval, normalInterval, isDelayComplete]);

  return <span className={className}>{count}</span>;
}