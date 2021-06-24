import * as React from 'react';
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AnimatePresence, motion } from 'framer-motion';
import { isLanding, menuOpen, pageRendered } from '../../store';
import SubtextSlider from '../../components/SubtextSlider';
import Headline from '../../components/Headline';
import Link from '../../components/Link';

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

function Neighborhood(): JSX.Element {
  const setRendered = useSetRecoilState(pageRendered);
  const setLanded = useSetRecoilState(isLanding);
  const open = useRecoilValue(menuOpen);

  React.useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('scrollable');

    setLanded(true);
    setRendered({ page: 'project', seed: Math.random() });
  }, []);

  React.useEffect(() => {
    if (!open) {
      setRendered({ page: 'project', seed: Math.random() });
    }
  }, [open]);

  return (
    <AnimatePresence>
      { !open &&  (
        <article className="page">
          <section className="page__head page__section">
            <Headline
              headline="A department store with an ever-changing selection of brands and products. Most of them you wouldn't find in stores, let alone on another website."
              open={open}
              tags={{
                client: 'Neighborhood Goods',
                agency: 'Mobelux',
                status: 'Live',
                role: 'Engineer',
                tech: 'Next.js, GraphQL, Rails'
              }}
            />
            <span className="slider__ruler-top still" />
            <Link href="https://neighborhoodgoods.com/" label="View Site" swap headline />
          </section>
          <section className="page__image-placeholder">
            <img src="https://source.unsplash.com/P3pI6xzovu0/1920x1080" alt='silence you fool' className='gl-about-scene' />
          </section>
          <section className="page__head page__section works">
            <Headline
              headline="Designed in house by Mobelux. We built a completely custom CMS to handle their ever fluctuating Brands, Products, and Digital Content. Backed by Next.js, and Rails."
              open={open}
            />
          </section>
          <section className="page__section" style={{ marginTop: 120 }}>
            <div className="page__paragraph flexed">
              <div className="page__cell">
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={lineVariants}
                  className="page__tag"
                >
                  Year
                </motion.div>
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={countVariants}
                  className="page__count"
                >
                  '20
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
                  Hours Contributed
                </motion.div>
                <motion.div
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={countVariants}
                  className="page__count"
                >
                  435
                </motion.div>
              </div>
            </div>
          </section>
          <section style={{ marginTop: '16rem' }} className="page__image-placeholder">
            <img src="/images/ng1.png" alt='silence you fool' className="cover" />
          </section>
          <section className="work__stack">
            <figure style={{ marginRight: 0 }} className="work__figure">
              <img src="/images/ng2.png" alt='silence you fool' />
            </figure>
            <figure style={{ marginLeft: 60 }} className="work__figure">
              <img src="/images/ng3.png" alt='silence you fool' />
            </figure>
          </section>
          <section style={{ marginTop: '16rem' }} className="page__image-placeholder">
            <img src="/images/ng4.png" alt='silence you fool' className="cover" />
          </section>
          <section className="work__bottom-container">
            <Link href="/work" label="Back to Work" swap={false} page center />
          </section>
        </article>
      )}
    </AnimatePresence>
  )
}

export default Neighborhood;