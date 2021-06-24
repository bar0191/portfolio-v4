import * as React from 'react';
import { debounce } from 'debounce';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { wrap, snap } from 'popmotion';
import { useWindowSize, lerp, useScrollDirection, getTranslateX } from '../util';
import CarouselItem from './CarouselItem';

const padding = 200;

interface CarouselItemTypes {
  index: number,
  image: string,
  label: string,
  href: string,
  count: number,
}

interface CarouselPropTypes {
  slides: Array<CarouselItemTypes>,
}

interface CarouselStateTypes {
  direction: number,
  y: number,
  slides: Array<CarouselItemTypes>,
  itemWidth: number,
  anchors: Array<number>,
  padding: number,
  positions: Array<number>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSnapping: Function,
  // eslint-disable-next-line @typescript-eslint/ban-types
  setDirection: Function,
}

export type AnyPointerEvent = MouseEvent | TouchEvent | PointerEvent;
type CallbackType = (args: CarouselStateTypes) => void;

function Carousel({ slides = [] }: CarouselPropTypes): JSX.Element {
  const controls = useAnimation();
  const container = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width, height] = useWindowSize();
  const scrollValue = useScrollDirection();
  const [anchors, setAnchors] = useState<Array<number>>([]);
  const [positions, setPositions] = useState<Array<number>>([]);
  const [dragging, setDragging] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState(0);
  const [y, setY] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [init, setInit] = useState(false);

  const toScale = (x: number) => {
    const distance = (itemWidth + padding) / 2;
    const increment = 0.25 / distance;

    if (x === 0 && distance === 0) {
      return 1.25;
    }

    if (x < distance && x >= 0) {
      return 1 + ((distance - x) * increment);
    }
    if (x > (distance * -1) && x <= 0) {
      return 1 + Math.abs((((distance * -1) - x) * increment));
    }

    return 1;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const verify = useCallback<CallbackType>(
    debounce((props: CarouselStateTypes) => {
      const {
        direction,
        y,
        slides,
        itemWidth,
        anchors,
        padding,
        positions,
        setSnapping,
        setDirection,
      } = props;
      setSnapping(true);
      const snapToArbitraryDegrees = snap([...anchors]);
      const elements: HTMLCollection | undefined = container?.current?.children;

      let loc = 0;
      if (elements) {
        loc = getTranslateX(elements[0]);
      }

      setDirection(direction + (snapToArbitraryDegrees(loc) - loc));

      controls.start(({ index }) => {
        const wrapped = wrap(
          anchors[0] - ((itemWidth + padding) / 2),
          anchors[slides.length - 1] + ((itemWidth + padding) / 2),
          positions[index] + y
        )
        const snapped = snapToArbitraryDegrees(wrapped);

        return {
          x: snapped,
          scale: toScale(snapped),
          transition: {
            duration: 0.2,
          }
        }
      });
      setTimeout(() => setSnapping(false), 100);

    }, 150),
    []
  );

  const handleTouchStart = (event: AnyPointerEvent, info: PanInfo) => {
    setStart(info.point.x);
    setDragging(true);
  }

  const handleTouchMove = (event: AnyPointerEvent, info: PanInfo) => {
    if (!dragging) return;
    setDirection(direction + (info.point.x - start) * 2.5);
    setStart(info.point.x);
  }

  const handleTouchEnd = () => {
    setDragging(false);
    verify({
      direction,
      y,
      slides,
      itemWidth,
      anchors,
      padding,
      positions,
      setSnapping,
      setDirection,
    });
  }

  useEffect(() => {
    const elements: HTMLCollection | undefined = container?.current?.children;
    if (elements) {
      const element = elements[0] as HTMLElement;
      const newPositions: Array<number> = [];

      if (width && element) {
        // eslint-disable-next-line no-shadow
        const start = -1 * (element.offsetWidth + padding) * (slides.length / 2);

        slides.forEach((slide, index) => {
          newPositions.push(start + ((element.offsetWidth + padding) * index));
        })

        controls.start(({ index }) => {
          const temp = start + ((element.offsetWidth + padding) * index);

          return {
            x: temp,
            scale: toScale(temp),
            transition: {
              duration: 0,
            }
          }
        });
        setItemWidth(element.offsetWidth);
        setAnchors(newPositions);
        setPositions(newPositions);
    }
    }
    // eslint-disable-next-line
  }, [width]);

  useEffect(() => {
    if (positions.length && !snapping) {
      const newY = lerp(y, direction, 0.2);
      setY(newY);
      controls.start(({ index }) => {
        const wrapped = wrap(
          anchors[0] - ((itemWidth + padding) / 2),
          anchors[slides.length - 1] + ((itemWidth + padding) / 2),
          positions[index] + newY
        )

        return {
          x: wrapped,
          scale: toScale(wrapped),
          transition: {
            duration: 0,
          }
        }

      });
    }
    // eslint-disable-next-line
  }, [direction]);

  useEffect(() => {
    if (!init) {
      setInit(true);
    } else {
      setDirection(direction + scrollValue);
    }
    // eslint-disable-next-line
  }, [scrollValue]);

  return (
    <motion.div
      className="carousel"
      ref={container}
      onPanStart={handleTouchStart}
      onPan={handleTouchMove}
      onPanEnd={handleTouchEnd}
    >
      { slides.map((slide, index) => (
        <CarouselItem
          key={slide.label + slide.index}
          index={index}
          item={slide}
          controls={controls}
        />
      ))}
    </motion.div>
  )
}

export default Carousel;