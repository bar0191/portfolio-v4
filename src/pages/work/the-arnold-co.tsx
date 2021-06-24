import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AnimatePresence, motion } from 'framer-motion';
import { isLanding, menuOpen, pageRendered } from '../../store';
import Headline from '../../components/Headline';
import Link from '../../components/Link';

const lineVariants = {
  enter: { y: 15, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -15, opacity: 0 }
}

const countVariants = {
  enter: { y: 20, opacity: 0, transition: { delay: 0.2 }},
  center: { y: 0, opacity: 1, transition: { delay: 0.2 }},
  exit: { y: -20, opacity: 0, transition: { delay: 0.2 }}
}

function Tac(): JSX.Element {
  const setRendered = useSetRecoilState(pageRendered);
  const setLanded = useSetRecoilState(isLanding);
  const open = useRecoilValue(menuOpen);

  React.useEffect(() => {
    const body = document.querySelector('body');

    if (body) {
      body.classList.add('scrollable');
    }

    setLanded(true);
    setRendered({ page: 'project', seed: Math.random() });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!open) {
      setRendered({ page: 'project', seed: Math.random() });
    }
    // eslint-disable-next-line
  }, [open]);

  return (
    <AnimatePresence>
      { !open &&  (
        <article className="page">
          <section className="page__head page__section">
            <Headline
              headline="Parent company of TAC Energy, Air, Investments, and Keystone Aviation. With a goal to consolidate these companies into one domain."
              open={open}
              tags={{
                client: 'The Arnold Co.',
                agency: 'Simple Media',
                status: 'Live',
                role: 'Engineer',
                tech: 'Next.js, Cosmic, GraphQL'
              }}
              email={false}
              quote={false}
            />
            <span className="slider__ruler-top still" />
            <Link
              href="https://www.thearnoldcos.com/"
              label="View Site"
              swap
              headline
              blank
              page={false}
              center={false}
            />
          </section>
          <section className="page__image-placeholder">
            <img src="https://source.unsplash.com/tmHzuxeZUAQ/1920x1080" alt='silence you fool' className='gl-about-scene' />
          </section>
          <section className="page__head page__section works">
            <Headline
              headline="Designed in house by Simple Media. We migrated 4 wordpress domains into a cutting edge CMS called Cosmic. Backed by Next.js, and GraphQL."
              open={open}
              email={false}
              quote={false}
              tags={null}
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
                  &#39;17
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
                  180
                </motion.div>
              </div>
            </div>
          </section>
          <section style={{ marginTop: '16rem' }} className="page__image-placeholder">
            <img src="/images/tac-blue.jpeg" alt='silence you fool' className="cover" />
          </section>
          <section className="work__stack">
            <figure style={{ marginRight: 0 }} className="work__figure">
              <img src="/images/energyLarge.png" alt='silence you fool' />
            </figure>
            <figure style={{ marginLeft: 60 }} className="work__figure">
              <img src="/images/keystone-large.png" alt='silence you fool' />
            </figure>
          </section>
          <section className="work__bottom-container">
            <Link
              href="/work"
              label="Back to Work"
              swap={false}
              page
              center
              headline={false}
              blank={false}
            />
          </section>
        </article>
      )}
    </AnimatePresence>
  )
}

export default Tac;