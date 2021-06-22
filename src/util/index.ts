import React, { useEffect, useLayoutEffect, useState } from 'react';
import normalizeWheel from 'normalize-wheel';

function useWindowSize() {
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

function useHeightListener(initialHeight: number) {
  const [height, setHeight] = useState(initialHeight);

  const handleResize = (event: Event) => {
    setHeight(event?.target?.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  return height;
}

function useScrollDirection() {
  const [direction, setDirection] = useState(0);

  const handleScroll = (event: Event) => {
    const normalized = normalizeWheel(event);
    setDirection(normalized.pixelY + Math.random() * (0.01 - 0.001) + 0.001);
  };

  useEffect(() => {
    window.addEventListener("mousewheel", handleScroll);
    return () => window.removeEventListener("mousewheel", handleScroll);
  }, [direction]);

  return direction;
}

const lerp = (v0, v1, t) => {
  return v0 * ( 1 - t ) + v1 * t;
}

export {
  useWindowSize,
  useHeightListener,
  useScrollDirection,
  lerp,
}