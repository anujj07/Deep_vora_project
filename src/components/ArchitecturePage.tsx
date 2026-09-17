import { useEffect, useRef, useState } from 'react';

type SheetFrameProps = {
  src: string;
  title: string;
};

export const SheetFrame = ({ src, title }: SheetFrameProps) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const updateHeight = () => {
    const document = frameRef.current?.contentDocument;
    if (!document) return;

    setHeight(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight));
  };

  const handleLoad = () => {
    const document = frameRef.current?.contentDocument;
    if (!document) return;

    observerRef.current?.disconnect();
    updateHeight();

    observerRef.current = new ResizeObserver(updateHeight);
    observerRef.current.observe(document.body);
    observerRef.current.observe(document.documentElement);
  };

  return (
    <iframe
      ref={frameRef}
      src={src}
      title={title}
      scrolling="no"
      onLoad={handleLoad}
      className="block w-full border-0"
      style={{ height: height ? `${height}px` : 'calc(100svh - 5rem)' }}
    />
  );
};

export const ArchitecturePage = () => (
  <main className="min-h-screen bg-[var(--bg-primary)] pt-20">
    <SheetFrame src="/catalyst-sheet.html" title="Catalyst - Collective Housing" />
    <SheetFrame src="/roads-public-realm.html" title="Roads not as conduits, but as public realm" />
  </main>
);
