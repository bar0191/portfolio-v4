import * as React from 'react';
import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { isLanding, menuOpen, pageRendered } from '../store';
import SubtextSlider from '../components/SubtextSlider';
import Headline from '../components/Headline';
import Link from '../components/Link';

const headlineVariants = {
  enter: {

  },

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
              <img alt='silence you fool' className='gl-about-scene' />
            </section>
            <section className="page__section">
              <div className="page__paragraph about__paragraph">
                <h3 className="page__cell">
                  Who am I
                </h3>
                <p className="page__cell about__me">
                  A jack of all trades, specializing in modern web app and creative development based
                  out of Richmond, Virginia. With a passion in all things aesthetically pleasing. I focus
                  on cutting edge digital paradigms with rich motion, visual, and web experiences.
                  <Link href="/work" label="Work" swap={false} page />
                </p>
              </div>
            </section>
            <section className="page__section" style={{ marginTop: 200 }}>
              <div className="page__paragraph flexed">
                <div className="page__cell">
                  <div className="page__tag">Coding Languages</div>
                  <div className="page__count">5</div>
                </div>
                <div className="page__cell">
                  <div className="page__tag">Years of Experience</div>
                  <div className="page__count">6</div>
                </div>
              </div>
            </section>
            <section className="page__section">
              <div className="page__paragraph flexed">
                <div className="page__cell">
                  <div className="page__tag">Frontend</div>
                  <ul className="page__list">
                    <li>Javascript</li>
                    <li>React</li>
                    <li>WebGL</li>
                    <li>ThreeJS</li>
                    <li>Mapbox</li>
                    <li>HTML & CSS</li>
                  </ul>
                </div>
                <div className="page__cell">
                  <div className="page__tag">Backend</div>
                  <ul className="page__list">
                    <li>Ruby on Rails</li>
                    <li>Python Django</li>
                    <li>PostgreSQL</li>
                    <li>NoSQL</li>
                    <li>Elastic Search</li>
                    <li>Security</li>
                  </ul>
                </div>
              </div>
            </section>
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