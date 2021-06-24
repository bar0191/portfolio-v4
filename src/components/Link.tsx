import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { motion, useAnimation } from "framer-motion";
import { useSetRecoilState } from 'recoil';
import { isWorkRendered } from '../store';

const labelVariant = {
  enter: { y: 50, transition: { duration: 0.4 } },
  center: { y: 0, transition: { duration: 0.4 } },
  exit: { y: -50, transition: { duration: 0.4 } }
}

const progressVariant = {
  enter: { x: -120, transition: { duration: 0.4 } },
  center: { x: 0, transition: { duration: 0.4 } },
  exit: { x: 120, transition: { duration: 0.4 } }
}

interface LinkPropTypes {
  href: string,
  label: string,
  swap: boolean | undefined,
  page: boolean | undefined,
  center: boolean | undefined,
  headline: boolean | undefined,
  blank: boolean | undefined
}

function HomeLink(props: LinkPropTypes): JSX.Element {
  const { href, label, swap, page, center, headline, blank } = props;
  const [cursor, setCursor] = useState<Element | null>(null);
  const [cursorInner, setCursorInner] = useState<Element | null>(null);
  const progress = useAnimation();
  const [traversing, setTraversing] = useState(false);
  const setWorkRendered = useSetRecoilState(isWorkRendered);

  useEffect(() => {
    const cursorEl = document.querySelector<Element>('#cursor');
    const cursorElInner = document.querySelector<Element>('.cursor')
    setCursor(cursorEl);
    setCursorInner(cursorElInner);
  }, []);

  const runProgress = async () => {
    setTraversing(true);
    await progress.start({
      x: 120,
      transition: {
        type: "tween",
        duration: 0.3,
      }
    });
    await progress.start({
      x: -120,
      transition: {
        type: "tween",
        duration: 0,
      }
    });
    await progress.start({
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      }
    });
    setTraversing(false);
  }

  const onEnter = () => {
    const inner = cursorInner as HTMLElement;
    if (cursor && inner) {
      cursor.classList.add('arrow');
      inner.style.opacity = "0";
    }

    if (!traversing) {
      runProgress().catch((e) => console.log(e));
    }

  };

  const onLeave = () => {
    const inner = cursorInner as HTMLElement;
    if (cursor && inner) {
      cursor.classList.remove('arrow');
      inner.style.opacity = "1";
    }
  };

  const onClick = () => {
    setWorkRendered(false);
    const inner = cursorInner as HTMLElement;
    if (cursor && inner) {
      cursor.classList.remove('arrow');
      inner.style.opacity = "1";
    }
  };

  return (
    <Link href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <a
        target={blank ? '_blank' : ''}
        onClick={onClick}
        className={cx("slider__link js-arrow", { swap, body: page, center, headline })}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <motion.span
          initial="enter"
          animate="center"
          exit="exit"
          variants={labelVariant}
          className="slider__link-label"
        >
          {label}
        </motion.span>
        <motion.span
          initial="enter"
          animate="center"
          exit="exit"
          variants={progressVariant}
          className="slider__link-hr"
        >
          <motion.span animate={progress} initial={{ x: 0 }} className="slider__link-hr-active" />
          <span className="slider__link-hr-bar" />
        </motion.span>
      </a>
    </Link>

  );
}

export default HomeLink;