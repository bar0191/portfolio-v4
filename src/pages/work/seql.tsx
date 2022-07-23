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

function Seql(): JSX.Element {
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
              headline="A next-gen athletic recruiting platform connecting high school athletes with college coaches."
              open={open}
              tags={{
                client: 'The Seql',
                agency: 'Mobelux',
                status: 'Live',
                role: 'Engineer',
                tech: 'Next.js, GraphQL, Hasura'
              }}
              email={false}
              quote={false}
            />
            <span className="slider__ruler-top still" />
            {/* <Link
              href="https://theseql.com"
              label="View Site"
              swap
              headline
              blank
              page={false}
              center={false}
            /> */}
          </section>
          <section className="page__image-placeholder">
            <img src="https://source.unsplash.com/UFIZodJgScQ/1920x1080" alt='silence you fool' className='gl-about-scene' />
          </section>
          <section className="page__head page__section works">
            <Headline
              headline="Designed in house by Mobelux. We built a static marketing page on Next.js, and an athlete/recruiter portal backed by GraphQL, and Hasura. "
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
                  &#39;19
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
                  60
                </motion.div>
              </div>
            </div>
          </section>
          <section style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '16rem',
          }}>
            <img src="/images/iphone_seql.png" alt='silence you fool' />
          </section>
          <section className="work__stack">
            <figure style={{ marginRight: 0 }} className="work__figure">
              <img src="/images/seqltop.png" alt='silence you fool' />
            </figure>
            <figure style={{ marginLeft: 60 }} className="work__figure">
              <img src="/images/seqlbot.png" alt='silence you fool' />
            </figure>
          </section>
          <section className="work__bottom-container">
            <Link
              href="/work"
              label="Back to Work"
              swap={false}
              page
              center
              blank={false}
              headline={false}
            />
          </section>
        </article>
      )}
    </AnimatePresence>
  )
}

export default Seql;