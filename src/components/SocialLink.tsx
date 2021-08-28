import * as React from 'react';
import { motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SocialLinkTypes {
  url: string,
  type: string,
}

function SocialLink({ url, type }: SocialLinkTypes): JSX.Element {
  const [progress, setProgress] = React.useState(182.12);
  const [cursor, setCursor] = useState<Element | null>(null);
  const [cursorInner, setCursorInner] = useState<Element | null>(null);

  useEffect(() => {
    const cursorEl = document.querySelector('#cursor');
    const cursorInnerEl = document.querySelector('.cursor');
    setCursor(cursorEl);
    setCursorInner(cursorInnerEl);
  }, []);

  const onEnter = () => {
    const inner = cursorInner as HTMLElement;

    if (cursor && inner) {
      cursor.classList.add('arrow');
      inner.style.opacity = "0";
    }

    animate(progress, 0, {
      duration: 0.5,
      onUpdate: (v) => setProgress(v),
    })
  };

  const onLeave = () => {
    const inner = cursorInner as HTMLElement;

    if (cursor && inner) {
      cursor.classList.remove('arrow');
      inner.style.opacity = "1";
    }

    animate(progress, -182.12, {
      duration: 0.5,
      onUpdate: (v) => setProgress(v),
      onComplete: () => setProgress(182.12),
    })
  };

  const getUrl = () => {
    switch (type) {
      case 'github':
        return 'https://github.com/xbreid';
      case 'linkedin':
        return 'https://www.linkedin.com/in/brandon-reid/';
      case 'dribbble':
        return 'https://b-reid.dribbble.com/';
      default:
        return '#';
    }
  }

  return (
    <motion.a
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      className="social__item"
      href={getUrl()}
    >
      <img className={`${type}`} src={url} alt='' />
      <motion.svg
        x="0px"
        y="0px"
        viewBox="0 0 60 60"
      >
        <path className="social__front" d="M30,1c16,0,29,13,29,29S46,59,30,59S1,46,1,30S14,1,30,1"
              style={{strokeDashoffset: `${progress}px` }} />
        <path className="social__back" d="M30,1c16,0,29,13,29,29S46,59,30,59S1,46,1,30S14,1,30,1" />
      </motion.svg>
    </motion.a>
  );
}

export default SocialLink;