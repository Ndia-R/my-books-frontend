import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

type Props = {
  end: number; // 最終的な数値
  duration?: number; // アニメーション時間（ミリ秒）
  delay?: number; // アニメーション開始までのディレイ（ミリ秒）
  ease?:
    | 'linear' // 一定速度
    | 'easeIn' // 最初ゆっくり
    | 'easeOut' // 最後ゆっくり
    | 'easeInOut' // 両端ゆっくり、真ん中速い
    | ((t: number) => number);
};

export default function CountUpNumber({
  end,
  duration = 1500,
  delay = 0,
  ease = 'easeInOut',
}: Props) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, end, {
      duration: duration / 1000,
      delay: delay / 1000,
      ease,
    });
    return controls.stop;
  }, [count, delay, duration, ease, end]);

  return <motion.span>{rounded}</motion.span>;
}
