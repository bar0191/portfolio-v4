import * as React from 'react';
import { debounce } from 'debounce';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { wrap, snap } from "popmotion";
import { useWindowSize, lerp, useScrollDirection } from '../util';
import CarouselItem from './CarouselItem';

const padding = 200;

function Carousel({ slides = [] }) {
  const controls = useAnimation();
  const container = useRef();
  const [width, height] = useWindowSize();
  const scrollValue = useScrollDirection();
  const [anchors, setAnchors] = useState([]);
  const [positions, setPositions] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState(0);
  const [y, setY] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

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
    }) => {
      const snapToArbitraryDegrees = snap([...anchors]);
      console.log('verified', [...anchors]);
      const newY = lerp(y, direction, 1.4);
      controls.start(({ index }) => {
        const wrapped = wrap(
          anchors[0] - ((itemWidth + padding) / 2),
          anchors[slides.length - 1] + ((itemWidth + padding) / 2),
          positions[index] + newY
        )
        const snapped = snapToArbitraryDegrees(wrapped);

        console.log([...anchors], wrapped);

        return {
          x: snapped,
          scale: toScale(snapped),
          transition: {
            duration: 0.2,
          }
        }

      });
    }, 100),
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
    if (positions.length) {
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

  useEffect(() => setDirection(direction + scrollValue), [scrollValue]);

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