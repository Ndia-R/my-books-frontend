import { useRef } from 'react';

export const useRipple = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const createRipple = (mouseEvent: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const ripple = document.createElement('span');

    // 波紋のサイズを計算（対角線の長さを基準）
    const size =
      Math.sqrt(containerRect.width ** 2 + containerRect.height ** 2) * 1.5;

    const x = mouseEvent.clientX - containerRect.left - size / 2;
    const y = mouseEvent.clientY - containerRect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ripple.className =
      'absolute rounded-full bg-foreground pointer-events-none';

    container.appendChild(ripple);

    // Web Animations APIでアニメーションを定義
    const rippleAnimation = ripple.animate(
      [
        {
          transform: 'scale(0)',
          opacity: '0.4',
        },
        {
          transform: 'scale(1)',
          opacity: '0',
        },
      ],
      {
        duration: 600,
        easing: 'ease-out',
        fill: 'forwards',
      }
    );

    // finished プロミスを使用してエレメント削除
    rippleAnimation.finished
      .then(() => {
        ripple.remove();
      })
      .catch(() => {
        // アニメーションがキャンセルされた場合も削除
        ripple.remove();
      });
  };

  return { containerRef, createRipple };
};
