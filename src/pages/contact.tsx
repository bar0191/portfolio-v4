import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Headline from '../components/Headline';
import SubtextSlider from '../components/SubtextSlider';
import Link from '../components/Link';
import { isLanding, menuOpen, pageRendered } from '../store';
import SocialLink from '../components/SocialLink';

const variants = {
  enter: {
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: 0.8,
    }
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.8,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  }
}

function Contact() {
  const setRendered = useSetRecoilState(pageRendered);
  const setLanded = useSetRecoilState(isLanding);
  const open = useRecoilValue(menuOpen);

  React.useEffect(() => {
    setLanded(true);
    setRendered({ page: 'contact', seed: Math.random() });
  }, []);

  React.useEffect(() => {
    if (!open) {
      setRendered({ page: 'contact', seed: Math.random() });
    }
  }, [open]);

  return (
    <AnimatePresence>
      { !open &&  (
        <article className="page">
          <section className="page__head page__section">
            <Headline
              headline="Drop me a line. Lets build something awesome together! 🚀"
              open={open}
              email
              quote={false}
              tags={null}
            />
            <motion.div
              initial="enter"
              animate="center"
              exit="exit"
              className="social"
              variants={variants}
            >
              <SocialLink type='github' url='/images/github-6-64.png' />
              <SocialLink type='linkedin' url='/images/linkedin-64.png' />
            </motion.div>
          </section>
        </article>
      )}
    </AnimatePresence>
  )
}

export default Contact;