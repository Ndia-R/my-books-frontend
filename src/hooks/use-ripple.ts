import { useRef } from 'react';

export function useRipple() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const createRipple = (event: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const ripple = document.createElement('span');

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.className = `
      absolute
      rounded-full
      bg-black
      opacity-30
      pointer-events-none
      animate-ripple
    `;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    container.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  };

  return { containerRef, createRipple };
}
