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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [height]);

  return height;
}

function useDetectTrackpad(): boolean {
  const [isTrackpad, setIsTrackpad] = useState(false);

  const detectTrackpad = (event: Event) => {
    let isTrackpad = false;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (event.wheelDeltaY) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (Math.abs(event.wheelDeltaY) !== 120) {
        isTrackpad = true;
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    else if (event.deltaMode === 0) {
      isTrackpad = true;
    }

    setIsTrackpad(isTrackpad);
  };

  useEffect(() => {
    window.addEventListener('mousewheel', detectTrackpad);
    window.addEventListener('DOMMouseScroll', detectTrackpad);
    // window.addEventListener("touchmove", detectTrackpad);
    return () => {
      window.removeEventListener('mousewheel', detectTrackpad);
      window.removeEventListener('DOMMouseScroll', detectTrackpad);
      /// window.addEventListener("touchmove", detectTrackpad);
    };
  }, [isTrackpad]);

  return isTrackpad;
}

function useScrollDirection(): number {
  const [direction, setDirection] = useState(0);
  let start: Touch | null;

  const handleScroll = (event: Event | TouchEvent) => {
    const normalized = normalizeWheel(event);

    setDirection(normalized.pixelY + Math.random() * (0.01 - 0.001) + 0.001);
  };

  const handleTouchStart = (event: TouchEvent) => {
    // eslint-disable-next-line prefer-destructuring
    start = event.changedTouches[0];
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const end: Touch = event.changedTouches[0];

    if (!start) return;

    if (end.screenY - start.screenY > 0) {
      setDirection(-1 + Math.random() * (0.01 - 0.001) + 0.001);
    } else if (end.screenY - start.screenY < 0) {
      setDirection(1 + Math.random() * (0.01 - 0.001) + 0.001);
    }
  };

  useEffect(() => {
    window.addEventListener('mousewheel', handleScroll);
    window.addEventListener('DOMMouseScroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    // window.addEventListener("touchmove", handleScroll);
    return () => {
      window.removeEventListener('mousewheel', handleScroll);
      window.removeEventListener('DOMMouseScroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      // window.removeEventListener("touchmove", handleScroll);
    };
  }, [direction]);

  return direction;
}

const lerp = (v0: number, v1: number, t: number): number => v0 * (1 - t) + v1 * t;

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
  useDetectTrackpad,
};
