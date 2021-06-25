import { useEffect, useLayoutEffect, useState } from 'react';
import normalizeWheel from 'normalize-wheel';

function useWindowSize(): Array<number> {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function useHeightListener(initialHeight: number): number {
  const [height, setHeight] = useState(initialHeight);

  const handleResize = (event: Event) => {
    if (event && event.target) {
      const w = event.target as Window;
      setHeight(w.innerHeight);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  return height;
}

function useScrollDirection(): number {
  const [direction, setDirection] = useState(0);

  const handleScroll = (event: Event) => {
    const normalized = normalizeWheel(event);
    setDirection(normalized.pixelY + Math.random() * (0.01 - 0.001) + 0.001);
  };

  useEffect(() => {
    window.addEventListener("mousewheel", handleScroll);
    window.addEventListener("DOMMouseScroll", handleScroll);
    // window.addEventListener("touchmove", handleScroll);
    return () => {
      window.removeEventListener("mousewheel", handleScroll);
      window.removeEventListener("DOMMouseScroll", handleScroll);
    }
  }, [direction]);

  return direction;
}

const lerp = (v0: number, v1: number, t: number): number => {
  return v0 * ( 1 - t ) + v1 * t;
}

function getTranslateX(el: Element): number {
  const style = window.getComputedStyle(el);
  const matrix = new WebKitCSSMatrix(style.transform);

  return matrix.m41;
}

export {
  useWindowSize,
  useHeightListener,
  useScrollDirection,
  lerp,
  getTranslateX,
}