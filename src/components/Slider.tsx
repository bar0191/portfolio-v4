import * as React from 'react';
import { motion, animate } from 'framer-motion';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import Landing from './Landing';
import About from './About';
import Work from './Work';
import Contact from './Contact';
import { isLanding, menuOpen } from '../store';
import SliderCounter from './SliderCounter';
import { useScrollDirection, useHeightListener } from '../util';

interface SliderProps {
  height: number
}

function Slider({  height }: SliderProps): JSX.Element {
  const slideLength = 4;
  const direction = useScrollDirection();
  const windowHeight = useHeightListener(height);
  const [index, setIndex] = useState(1);
  const [traverse, setTraverse] = useState(false);
  const [position, setPosition] = useState(windowHeight * -1);
  const [landed, setLanded] = useRecoilState(isLanding);
  const [trigger, setTrigger] = useState(0);
  const open = useRecoilValue(menuOpen);

  useEffect(() => {
    if (index !== 1 && !landed) {
      setLanded(true);
    } else if (index === 1 && landed) {
      setLanded(false);
    }
  }, [index]);
  useEffect(() => setPosition((windowHeight * -1 * index)), [windowHeight]);
  useEffect(() => {
    if (!traverse && !open) {
      let newIndex = index;
      let runAnimation = false;
      let variation = 0;

      if (direction < 0 && index === 0) {
        setTraverse(true);
        newIndex = 3;
        setPosition(-1 * height * 4);
        setIndex(newIndex);
        runAnimation = true;
      } else if (direction < 0 && index !== 1) {
        setTraverse(true);
        newIndex = index - 1;
        setIndex(newIndex);
        runAnimation = true;
        variation = 1;
      } else if (direction > 0) {
        setTraverse(true);
        newIndex = index + 1;
        setIndex(newIndex);
        runAnimation = true;
        variation = -1;
      }

      if (runAnimation && variation !== 0) {
        const newY = ((windowHeight * -1 * index) + (windowHeight * variation));
        setTrigger(direction);
        animate(position, newY, {
          duration: 0.8,
          stiffness: 1000,
          velocity: -100,
          onUpdate: (v) => setPosition(v),
          onComplete: () => {
            if (newIndex === slideLength) {
              setPosition(0.001);
              setIndex(0);
            }
            runAnimation = false;
            setTraverse(false);
          },
        })
      } else if (runAnimation && variation === 0) {
        const newPos = (-1 * height * 4);
        const nextPos = newPos + height;
        setTrigger(direction);
        animate(newPos, nextPos, {
          duration: 0.8,
          stiffness: 1000,
          velocity: -100,
          onUpdate: (v) => setPosition(v),
          onComplete: () => {
            runAnimation = false;
            setTraverse(false);
          },
        })
      }
    }
  }, [direction]);

  return (
    <>
      <motion.article style={{ y: position }}>
        <Contact landed />
        <Landing />
        <About landed={ index === 2 } />
        <Work landed={ index === 3 } />
        <Contact landed={index === 0 || index === 4} />
      </motion.article>
      <SliderCounter index={index} direction={trigger} length={slideLength} />
    </>

  );
}

export default Slider;