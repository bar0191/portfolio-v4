import * as React from 'react';
import { motion, animate, AnimationControls } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLinkHover, isWorkRendered } from '../store';

interface CarouselItemTypes {
  index: number,
  image: string,
  label: string,
  href: string,
  count: number,
}

interface CarouselItemPropTypes {
  item: CarouselItemTypes,
  controls: AnimationControls,
  index: number,
}



function CarouselItem(props: CarouselItemPropTypes): JSX.Element {
  const { item, controls, index } = props;
  const setOnHover = useSetRecoilState(isLinkHover);
  const [progress, setProgress] = useState(0);
  const [cursor, setCursor] = useState<Element | null>(null);
  const [cursorInner, setCursorInner] = useState<Element | null>(null);
  const isRendered = useRecoilValue(isWorkRendered);

  useEffect(() => {
    const cursorEl = document.querySelector<Element>('#cursor');
    const cursorInnerEl = document.querySelector<Element>('.cursor');
    setCursor(cursorEl);
    setCursorInner(cursorInnerEl);
  }, []);

  const onEnter = () => {
    setOnHover(true);
    animate(progress, 100, {
      duration: 0.8,
      onUpdate: (v) => setProgress(v),
    });

    const inner = cursorInner as HTMLElement;
    if (cursor && inner) {
      cursor.classList.add('arrow');
      inner.style.opacity = "0";
    }
  };

  const onLeave = () => {
    setOnHover(false);
    animate(progress, 0, {
      duration: 0.8,
      onUpdate: (v) => setProgress(v),
    });

    const inner = cursorInner as HTMLElement;
    if (cursor && inner) {
      cursor.classList.remove('arrow');
      inner.style.opacity = "1";
    }
  };

  const onClick = () => {
    setOnHover(false);

    const inner = cursorInner as HTMLElement;
    if (cursor && inner) {
      cursor.classList.remove('arrow');
      inner.style.opacity = "1";
    }
  };

  return (
    <motion.div
      className="carousel__container"
      custom={{ index }}
      animate={controls}
    >
      { isRendered && (
        <Link href={item.href}>
          <motion.a
            style={{ backgroundSize: `100% ${progress}%`}}
            onClick={onClick}
            className="carousel__label js-click-hold"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {item.label}
            <svg className="cta-arrow" viewBox="0 0 9.2 9.2">
              <path d="M8.7,2.3v6.3H2.3 M8.7,8.7L0.4,0.4" />
            </svg>
          </motion.a>
        </Link>
      )}
      <figure className="carousel__figure" style={isRendered ? {} : { boxShadow: 'none'}}>
        <img className="gl-slide-scene" src={item.image} alt={item.label} />
      </figure>
    </motion.div>
  )
}

export default CarouselItem;