import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type InputProps = React.ComponentPropsWithoutRef<'input'> & { wrapperClassName?: string };

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className = '', wrapperClassName = '', ...props }, ref) => (
  <div className={wrapperClassName}>
    <input ref={ref} className={className} {...props} />
  </div>
));
Input.displayName = 'Input';

/** An input whose visible caret springs smoothly to the text selection position. */
export const SmoothInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', wrapperClassName = '', value, defaultValue, onChange, onBlur, style, ...props }, forwardedRef) => {
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '');
    const inputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const caretX = useMotionValue(0);
    const opacity = useMotionValue(0);
    const reducedMotion = useReducedMotion();
    const springX = useSpring(caretX, reducedMotion ? { stiffness: 10000, damping: 100 } : { stiffness: 560, damping: 34, mass: 0.45 });
    const controlled = value !== undefined;
    const inputValue = controlled ? String(value ?? '') : internalValue;

    const updateCaret = (input: HTMLInputElement) => {
      const selectionStart = input.selectionStart ?? 0;
      const selectionEnd = input.selectionEnd ?? selectionStart;
      if (selectionStart !== selectionEnd) { opacity.set(0); return; }

      const styles = window.getComputedStyle(input);
      const canvas = canvasRef.current ?? document.createElement('canvas');
      canvasRef.current = canvas;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
      const prefix = input.type === 'password' ? '•'.repeat(selectionStart) : input.value.slice(0, selectionStart);
      const letterSpacing = Number.parseFloat(styles.letterSpacing) || 0;
      const textWidth = context.measureText(prefix).width + Math.max(0, prefix.length - 1) * letterSpacing;
      const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
      const paddingRight = Number.parseFloat(styles.paddingRight) || 0;
      const absoluteX = paddingLeft + textWidth;
      const visibleRight = input.scrollLeft + input.clientWidth - paddingRight;
      if (absoluteX > visibleRight) input.scrollLeft = absoluteX - input.clientWidth + paddingRight;
      if (absoluteX < input.scrollLeft + paddingLeft) input.scrollLeft = Math.max(0, absoluteX - paddingLeft);
      const x = absoluteX - input.scrollLeft;
      caretX.set(Math.max(paddingLeft - 1, Math.min(x, input.clientWidth - paddingRight)));
      opacity.set(1);
    };

    useEffect(() => {
      const input = inputRef.current;
      if (!input) return;
      const refresh = () => { if (document.activeElement === input) requestAnimationFrame(() => updateCaret(input)); };
      document.addEventListener('selectionchange', refresh);
      input.addEventListener('scroll', refresh);
      window.addEventListener('resize', refresh);
      return () => { document.removeEventListener('selectionchange', refresh); input.removeEventListener('scroll', refresh); window.removeEventListener('resize', refresh); };
    }, []);

    useEffect(() => { const input = inputRef.current; if (input && document.activeElement === input) updateCaret(input); }, [inputValue]);

    return (
      <div className={`relative ${wrapperClassName}`}>
        <input
          {...props}
          ref={(node) => { inputRef.current = node; if (typeof forwardedRef === 'function') forwardedRef(node); else if (forwardedRef) forwardedRef.current = node; }}
          value={inputValue}
          style={{ ...style, caretColor: 'transparent' }}
          className={className}
          onFocus={(event) => updateCaret(event.currentTarget)}
          onClick={(event) => updateCaret(event.currentTarget)}
          onKeyUp={(event) => updateCaret(event.currentTarget)}
          onChange={(event) => { if (!controlled) setInternalValue(event.target.value); onChange?.(event); requestAnimationFrame(() => updateCaret(event.currentTarget)); }}
          onBlur={(event) => { opacity.set(0); onBlur?.(event); }}
        />
        <motion.span aria-hidden className="pointer-events-none absolute top-1/2 h-[1em] w-px -translate-y-1/2 bg-current" style={{ x: springX, opacity }} />
      </div>
    );
  },
);
SmoothInput.displayName = 'SmoothInput';
