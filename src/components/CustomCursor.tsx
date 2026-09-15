import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ currentX: -100, currentY: -100, targetX: -100, targetY: -100 });

  useEffect(() => {
    // Only enable on pointer devices (not pure touch)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      // Check if hovering over special data-cursor attributes or interactive elements
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest('button, a, [data-cursor], .cursor-pointer');
      
      if (clickable) {
        setIsHovered(true);
        const customLabel = clickable.getAttribute('data-cursor');
        setCursorText(customLabel || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth inertia interpolation loop
    let animationFrameId: number;
    const render = () => {
      const { currentX, currentY, targetX, targetY } = posRef.current;
      
      // Lerp factor
      const ease = 0.18;
      posRef.current.currentX += (targetX - currentX) * ease;
      posRef.current.currentY += (targetY - currentY) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.currentX}px, ${posRef.current.currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      style={{ willChange: 'transform' }}
    >
      {/* Outer subtle ring */}
      <div
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          isHovered
            ? 'w-12 h-12 bg-black/10 border border-black/40 backdrop-blur-xs scale-125'
            : 'w-6 h-6 bg-transparent border border-black/30'
        }`}
      >
        {/* Center dot */}
        <div
          className={`rounded-full bg-black transition-all duration-200 ${
            isHovered ? 'w-1.5 h-1.5 opacity-80' : 'w-1 h-1'
          }`}
        />

        {cursorText && (
          <span className="absolute top-14 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black text-white text-[9px] font-mono-tech whitespace-nowrap uppercase tracking-wider shadow-md">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
