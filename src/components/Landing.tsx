import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useRecoilValue } from 'recoil';
import SubtextSlider from './SubtextSlider';
import { menuOpen } from '../store';

const variants = {
  visible: (init: boolean) => ({
    scale: 1,
    opacity: 1,
    x: '-50%',
    y: '-60%',
    rotate: '-7deg',
    transition: {
      duration: 0.3,
      delay: init ? 0.5 : 0,
    },
  }),
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

function Landing(): JSX.Element {
  const open = useRecoilValue(menuOpen);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setInit(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className='slider__section'>
      <div className="slider__container">
        <motion.h1
          initial="hidden"
          animate={open ? "hidden" : "visible"}
          variants={variants}
          custom={init}
          className="landing__h1"
        >
          Brandon <br/> Reid
        </motion.h1>
      </div>
      {/* <span className="slider__ruler-top"/> */}
      <SubtextSlider
        slides={[
          'welcome you.',
          'build award winning apps.',
          'disrupt design.',
          'am always learning.',
          'never stop tinkering.',
          'wish you well.',
        ]}
        label="I"
        swapped={false}
        still={false}
      />
    </section>
  );
}

export default Landing;