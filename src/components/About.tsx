import * as React from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import SubtextSlider from './SubtextSlider';
import { menuOpen } from '../store';
import Link from './Link';

const variants = {
  enter: {
    y: 60,
    transition: {
      duration: 1,
      y: { stiffness: 1000 }
    }
  },
  center: {
    y: 0,
    transition: {
      duration: 1,
      y: { stiffness: 1000 }
    }
  },
  exit: {
    y: -60,
    transition: {
      duration: 0.3,
      y: { stiffness: 1000 }
    }
  }
};


function About({ landed = false }): JSX.Element {
  const [init, setInit] = useState(false);
  const open = useRecoilValue(menuOpen);

  useEffect(() => {
    if (landed && !init) {
      setTimeout(() => {
        setInit(true);
      }, 800);
    }
  }, [landed]);

  return (
    <section className='slider__section'>
      <AnimatePresence>
        { (init && !open) && (
          <>
            <div className="slider__container">
              <h1 className="about__h1">
                <span className="about__label">
                  <motion.span
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={init}
                    variants={variants}
                  >
                    I am a Creative <br/>
                  </motion.span>
                </span>
                <span className="about__label">
                  <motion.span
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={init}
                    variants={variants}
                  >
                    Developer.
                  </motion.span>
                </span>
              </h1>
            </div>
            <Link href="/about" label="About me" swap={false} />
            <span className="slider__ruler-top" />
            <SubtextSlider
              slides={[
                'creating.',
                'developing.',
                'web design.',
                'ux design.',
                'pixel art.',
                'good food.',
              ]}
              label="Passion for"
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

export default About;