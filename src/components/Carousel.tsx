import * as React from 'react';
import { debounce } from 'debounce';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { wrap, snap } from 'popmotion';
import { useWindowSize, lerp, useScrollDirection } from '../util';
import CarouselItem from './CarouselItem';

const padding = 200;

function getTranslateX(el) {
  var style = window.getComputedStyle(el);
  var matrix = new WebKitCSSMatrix(style.transform);
  console.log('translateX: ', matrix.m41);
  return matrix.m41;
}

function Carousel({ slides = [] }) {
  const controls = useAnimation();
  const container = useRef();
  const [width, height] = useWindowSize();
  const scrollValue = useScrollDirection();
  const [anchors, setAnchors] = useState([]);
  const [positions, setPositions] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState(0);
  const [y, setY] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [init, setInit] = useState(false);

  const handleTouchStart = (event, info) => {
    setStart(info.point.x);
    setDragging(true);
  }

  const handleTouchMove = (event, info) => {
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

  const toScale = (x) => {
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

  const verify = useCallback(
    debounce(({
      direction,
      y,
      slides,
      itemWidth,
      anchors,
      padding,
      positions,
      setSnapping,
      setDirection,
    }) => {
      setSnapping(true);
      const snapToArbitraryDegrees = snap([...anchors]);
      const elements = container.current.children;
      const loc = getTranslateX(elements[0]);

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

  useEffect(() => {
    const elements = container.current.children;
    const element = elements[0];
    const newPositions = [];

    if (width && element) {
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
  }, [direction]);

  useEffect(() => {
    if (!init) {
      setInit(true);
    } else {
      setDirection(direction + scrollValue);
      // verify({
      //   direction,
      //   y,
      //   slides,
      //   itemWidth,
      //   anchors,
      //   padding,
      //   positions,
      //   setSnapping,
      //   setDirection,
      // });
    }
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
        <CarouselItem key={slide.label + index} index={index} item={slide} controls={controls} />
      ))}
    </motion.div>
  )
}

export default Carousel;