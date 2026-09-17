import React, { useCallback, useEffect, useRef, useState } from 'react';

export const JournalEmbed: React.FC = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  const fitFrameToContent = useCallback(() => {
    const documentElement = frameRef.current?.contentDocument?.documentElement;
    if (!documentElement) return;
    setHeight(Math.ceil(documentElement.scrollHeight));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', fitFrameToContent);
    return () => window.removeEventListener('resize', fitFrameToContent);
  }, [fitFrameToContent]);

  return (
    <section id="work" aria-label="Journal 2026">
      <iframe
        ref={frameRef}
        src="/journal-2026-light.html"
        title="Journal 2026 - Stories from the practice"
        onLoad={fitFrameToContent}
        className="block w-full border-0"
        style={{ height: height ? `${height}px` : '100svh' }}
      />
    </section>
  );
};
