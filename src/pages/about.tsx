import * as React from 'react';
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AnimatePresence, motion } from 'framer-motion';
import { isLanding, menuOpen, pageRendered } from '../store';
import SubtextSlider from '../components/SubtextSlider';
import Headline from '../components/Headline';
import Link from '../components/Link';

const lineVariants = {
  enter: {
    y: 15,
    opacity: 0,
  },
  center: {
   y: 0,
   opacity: 1,
  },
  exit: {
    y: -15,
    opacity: 0,
  }
}

const countVariants = {
  enter: {
    y: 20,
    opacity: 0,
    transition: {
      delay: 0.2,
    }
  },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      delay: 0.2,
    }
  }
}

function About(): JSX.Element {
  const setRendered = useSetRecoilState(pageRendered);
  const setLanded = useSetRecoilState(isLanding);
  const open = useRecoilValue(menuOpen);

  React.useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('scrollable');

    setLanded(true);
    setRendered({ page: 'about', seed: Math.random() });
  }, []);

  React.useEffect(() => {
    if (!open) {
      setRendered({ page: 'about', seed: Math.random() });
    }
  }, [open]);

  const sweetPics = [
    'CBcS51cGoSw',
    'feXpdV001o4',
    'QwoNAhbmLLo',
    'lhnOvu72BM8',
    'arwTpnIUHdM',
    'ineC_oi7NHs',
    '71SHXwBLp5w',
    'MFYlCoSm-0o'
  ];

  const randomPic = sweetPics[Math.floor(Math.random() * sweetPics.length)];
  return (
    <AnimatePresence>
        { !open &&  (
          <article className="page">
            <section className="page__head page__section">
              <Headline
                headline="I have no special talents. I am only passionately curious."
                quote
                open={open}
              />
              <span className="slider__ruler-top still" />
              <SubtextSlider
                still
                slides={[]}
                label="Albert Einstein"
              />
            </section>
            <section className="page__image-placeholder">
              <img src={`https://source.unsplash.com/${randomPic}/1920x1080`} alt='silence you fool' className='gl-about-scene' />
            </section>
            <section className="page__section">
              <div className="page__paragraph about__paragraph">
                <motion.h3
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={lineVariants}
                  className="page__cell"
                >
                  Who am I
                </motion.h3>
                <motion.p
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={lineVariants}
                  className="page__cell about__me"
                >
                  A jack of all trades, specializing in modern web app and creative development based
                  out of Richmond, Virginia. With a passion in all things aesthetically pleasing. I focus
                  on cutting edge digital paradigms with rich motion, visual, and web experiences.
                  <Link href="/work" label="Work" swap={false} page />
                </motion.p>
              </div>
            </section>
            <section className="page__section" style={{ marginTop: 200 }}>
              <div className="page__paragraph flexed">
                <div className="page__cell">
                  <motion.div
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={lineVariants}
                    className="page__tag"
                  >
                    Years of Experience
                  </motion.div>
                  <motion.div
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={countVariants}
                    className="page__count"
                  >
                    5
                  </motion.div>
                </div>
                <div className="page__cell">
                  <motion.div
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={lineVariants}
                    className="page__tag"
                  >
                    Project Contributions
                  </motion.div>
                  <motion.div
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={countVariants}
                    className="page__count"
                  >
                    27
                  </motion.div>
                </div>
              </div>
            </section>
            {/* <section className="page__section">
              <div className="page__paragraph flexed">
                <div className="page__cell">
                  <motion.div
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={lineVariants}
                    className="page__tag"
                  >
                    Frontend
                  </motion.div>
                  <motion.ul
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={countVariants}
                    className="page__list"
                  >
                    <li>Javascript</li>
                    <li>React</li>
                    <li>WebGL</li>
                    <li>ThreeJS</li>
                    <li>Mapbox</li>
                    <li>HTML & CSS</li>
                  </motion.ul>
                </div>
                <div className="page__cell">
                  <motion.div
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={lineVariants}
                    className="page__tag"
                  >
                    Backend
                  </motion.div>
                  <motion.ul
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={countVariants}
                    className="page__list"
                  >
                    <li>Ruby on Rails</li>
                    <li>Python Django</li>
                    <li>PostgreSQL</li>
                    <li>NoSQL</li>
                    <li>Elastic Search</li>
                    <li>Security</li>
                  </motion.ul>
                </div>
              </div>
            </section> */}
            <section className="page__head page__section flat last">
              <Headline
                headline="Give me a shout if you like what you see. Let's build something cool together! 🚀"
                open={open}
              />
              <Link href="/contact" label="Contact" swap={false} page center />
            </section>
            <section className="page__section" style={{height: 200}} />
          </article>
        )}
    </AnimatePresence>
  )
}

export default About;