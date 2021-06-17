import * as React from 'react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import SubtextSlider from './SubtextSlider';
import { menuOpen } from '../store';
import Link from './Link';

const displayVariants = {
  visible: {
    scale: 1,
    opacity: 1,
    x: '-50%',
    y: '-60%',
    rotate: '-7deg',
    transition: {
      duration: 0.3,
      delay: 0.3,
    },
  },
  hidden: {
    scale: 0.95,
    opacity: 0,
    x: '-50%',
    y: '-60%',
    rotate: '-7deg',
    transition: {
      duration: 0.3,
    },
  },
}

function Work({ landed = false }): JSX.Element {
  const [init, setInit] = useState(false);
  const open = useRecoilValue(menuOpen);

  useEffect(() => {
    if (landed && !init) {
      setTimeout(() => {
        setInit(true);
      }, 500);
    }
  }, [landed]);

  return (
    <section className='slider__section'>
      <AnimatePresence>
        { (init && !open) && (
          <>
            <div className="slider__container">
              <motion.h1
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={displayVariants}
                custom={init}
                className="landing__h1"
              >
                Work
              </motion.h1>
            </div>
            <Link href="/about" label="See work" swap />
            <span className="slider__ruler-top" />
            <SubtextSlider
              swapped
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

export default Work;