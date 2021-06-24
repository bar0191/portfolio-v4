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

function rbs(): JSX.Element {
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
              headline="Comprehensive and timely vulnerability intelligence, breach data and risk ratings, mapped to organizational assets, on a single platform."
              open={open}
              tags={{
                client: 'Risk Based Security',
                agency: 'Mobelux',
                status: 'Beta',
                role: 'Engineer',
                tech: 'React, Elasticsearch, Rails'
              }}
            />
            <span className="slider__ruler-top still" />
            <Link href="https://www.riskbasedsecurity.com/" label="View Site" swap headline />
          </section>
          <section className="page__image-placeholder">
            <img src="https://source.unsplash.com/1lfI7wkGWZ4/1920x1080" alt='silence you fool' className='gl-about-scene' />
          </section>
          <section className="page__head page__section works">
            <Headline
              headline="Designed in house by Mobelux. We built a platform that combines 3 products, into one aggregation tool. These products contained millions of vulnerability and incident records. To provide timely aggregations we built the platform on Elasticsearch and Rails. With a React frontend."
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
                  '21
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
                  2075
                </motion.div>
              </div>
            </div>
          </section>
          <section style={{ marginTop: '16rem' }} className="page__image-placeholder">
            <img src="/images/rbs1.png" alt='silence you fool' className="cover" />
          </section>
          <section style={{ marginTop: '4rem' }} className="page__image-placeholder">
            <img src="/images/rbs2.png" alt='silence you fool' className="cover" />
          </section>
          <section style={{ marginTop: '4rem' }} className="page__image-placeholder">
            <img src="/images/rbs3.png" alt='silence you fool' className="cover" />
          </section>
          <section className="work__bottom-container">
            <Link href="/work" label="Back to Work" swap={false} page center />
          </section>
        </article>
      )}
    </AnimatePresence>
  )
}

export default rbs;