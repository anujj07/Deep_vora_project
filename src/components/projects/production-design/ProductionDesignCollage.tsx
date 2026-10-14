import React, { useEffect, useRef } from 'react';

interface ProductionDesignCollageProps {
  className?: string;
  title: string;
}

export const ProductionDesignCollage: React.FC<ProductionDesignCollageProps> = ({
  className = 'block h-full w-full border-0',
  title,
}) => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let observer: ResizeObserver | undefined;
    const mobileLayout = window.matchMedia('(max-width: 900px)');
    const fitFrame = () => {
      if (!mobileLayout.matches) {
        frame.style.removeProperty('height');
        return;
      }
      const doc = frame.contentDocument;
      if (!doc?.body || !doc.documentElement) return;
      const height = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
      if (height > 0 && Math.abs(frame.getBoundingClientRect().height - height) > 1) {
        frame.style.height = `${height}px`;
      }
    };
    const observeContent = () => {
      const doc = frame.contentDocument;
      if (!doc?.body || !doc.documentElement) return;
      observer?.disconnect();
      observer = new ResizeObserver(fitFrame);
      observer.observe(doc.body);
      observer.observe(doc.documentElement);
      fitFrame();
    };
    const handleBreakpoint = () => fitFrame();

    frame.addEventListener('load', observeContent);
    mobileLayout.addEventListener('change', handleBreakpoint);
    window.addEventListener('resize', fitFrame, { passive: true });
    if (frame.contentDocument?.readyState === 'complete') observeContent();

    return () => {
      observer?.disconnect();
      frame.removeEventListener('load', observeContent);
      mobileLayout.removeEventListener('change', handleBreakpoint);
      window.removeEventListener('resize', fitFrame);
    };
  }, []);

  return <iframe ref={frameRef} src="/production-design-grid-viewer.html" title={title} className={className} loading="lazy" />;
};
