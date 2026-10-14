import { useEffect, type RefObject } from 'react';

const MESSAGE_TYPE = 'portfolio:iframe-viewport-visibility';

export function useIframeViewportVisibility(frameRef: RefObject<HTMLIFrameElement | null>) {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || typeof IntersectionObserver === 'undefined') return;

    let isVisible = false;
    const sendVisibility = () => {
      frame.contentWindow?.postMessage({ type: MESSAGE_TYPE, isVisible }, window.location.origin);
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      sendVisibility();
    }, { threshold: 0 });

    observer.observe(frame);
    frame.addEventListener('load', sendVisibility);
    return () => {
      observer.disconnect();
      frame.removeEventListener('load', sendVisibility);
    };
  }, [frameRef]);
}
