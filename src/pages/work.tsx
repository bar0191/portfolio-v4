import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLanding, menuOpen, pageRendered } from '../store';
import Carousel from '../components/Carousel';

const slides = [{
    index: 0,
    image: 'https://source.unsplash.com/4DykvhW8SsI/1920x1080',
    label: 'Slides',
    href: '/work/slide',
    count: 1,
  }, {
    index: 1,
    image: 'https://source.unsplash.com/random/1920x1080',
    label: 'Slides',
    href: '/work/slide',
    count: 2,
  }, {
    index: 2,
    image: 'https://source.unsplash.com/random/1920x1080',
    label: 'Slides',
    href: '/work/slide',
    count: 3,
  }, {
    index: 3,
    image: 'https://source.unsplash.com/random/1920x1080',
    label: 'Slides',
    href: '/work/slide',
    count: 4,
  }, {
    index: 4,
    image: 'https://source.unsplash.com/4DykvhW8SsI/1920x1080',
    label: 'Slides',
    href: '/work/slide',
    count: 1,
  }, {
    index: 5,
    image: 'https://source.unsplash.com/random/1920x1080',
    label: 'Slides',
    href: '/work/slide',
    count: 2,
  }, {
    index: 6,
    image: 'https://source.unsplash.com/random/1920x1080',
    label: 'Slides',
    href: '/work/slide',
    count: 3,
  }, {
    index: 7,
    image: 'https://source.unsplash.com/random/1920x1080',
    label: 'Slides',
    href: '/work/slide',
    count: 4,
  },
]

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
    <article className="work">
      <section className="work__container">
        <Carousel slides={slides} />
      </section>
    </article>
  );
}

export default Work;