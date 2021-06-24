import * as React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLanding, isWorkRendered, menuOpen, pageRendered } from '../store';
import Carousel from '../components/Carousel';
import { portfolio } from '../components/portfolio';

function Work(): JSX.Element {
  const setRendered = useSetRecoilState(pageRendered);
  const setLanded = useSetRecoilState(isLanding);
  const open = useRecoilValue(menuOpen);

  React.useEffect(() => {
    setLanded(true);
    setRendered({ page: 'work', seed: Math.random() });
  }, []);

  React.useEffect(() => {
    if (!open) {
      setRendered({ page: 'work', seed: Math.random() });
    }
  }, [open]);

  return (
    <AnimatePresence>
      { !open && (
        <article className="work">
          <section className="work__container">
            <Carousel slides={portfolio} />
          </section>
        </article>
      )}
    </AnimatePresence>
  );
}

export default Work;