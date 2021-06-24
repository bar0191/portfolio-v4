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

function Enformer(): JSX.Element {
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
              headline="A next-gen map tool for providing real time visualization of wetland and stream credit data by aggregating mitigation bank ledger transactions by service area."
              open={open}
              tags={{
                client: 'Enformer',
                agency: 'Mobelux',
                status: 'Beta',
                role: 'Engineer',
                tech: 'Django, Mapbox, PostGis, React'
              }}
            />
            <span className="slider__ruler-top still" />
            <Link href="https://enformer.co/" label="View Site" swap headline />
          </section>
          <section className="page__image-placeholder">
            <img src="https://source.unsplash.com/uPp_9j4pJJE/1920x1080" alt='silence you fool' className='gl-about-scene' />
          </section>
          <section className="page__head page__section works">
            <Headline
              headline="Designed in house by Mobelux. We built a modern map tool using mapbox, and react. We scrapped environmental services data to provide credit analysis based on Hydrological Units and service areas. Backed By Django, and Postgis."
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
                  230
                </motion.div>
              </div>
            </div>
          </section>
          <section style={{ marginTop: '16rem' }} className="page__image-placeholder">
            <img src="/images/enformer1.png" alt='silence you fool' className="cover" />
          </section>
          <section style={{ marginTop: '4rem' }} className="page__image-placeholder">
            <img src="/images/enformer2.png" alt='silence you fool' className="cover" />
          </section>
          <section style={{ marginTop: '4rem' }} className="page__image-placeholder">
            <img src="/images/enformer3.png" alt='silence you fool' className="cover" />
          </section>
          <section className="work__bottom-container">
            <Link href="/work" label="Back to Work" swap={false} page center />
          </section>
        </article>
      )}
    </AnimatePresence>
  )
}

export default Enformer;