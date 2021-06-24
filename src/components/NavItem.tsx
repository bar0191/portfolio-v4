import * as React from 'react';
import Link from 'next/link';
import { animate, motion } from 'framer-motion';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { isLinkHover, isRayZoomed, isWorkRendered, menuOpen } from '../store';

const variants = {
  enter: { x: -150, opacity: 0, },
  center: { x: 0, opacity: 1, },
  exit: { x: 350, opacity: 0, transition: { duration: 0.2 }}
};

interface NavItemTypes {
  href: string,
  label: string,
}

function NavItem({ href, label }: NavItemTypes): JSX.Element {
  const setOnHover = useSetRecoilState(isLinkHover);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [zoomed, setZoomed] = useRecoilState(isRayZoomed);
  const [progress, setProgress] = useState(0);
  const setOpen = useSetRecoilState(menuOpen);
  const [cursor, setCursor] = useState<Element | null>(null);
  const [cursorInner, setCursorInner] = useState<Element | null>(null);
  const setWorkRendered = useSetRecoilState(isWorkRendered);

  useEffect(() => {
    const cursorEl = document.querySelector('#cursor');
    const cursorInnerEl = document.querySelector('.cursor');

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
    setWorkRendered(false);
    setTimeout(() => {
      setOpen(false);
      /* if (!zoomed) {
        setZoomed(true);
      } */
      setOnHover(false);
    }, 300);

    const inner = cursorInner as HTMLElement;

    if (cursor && inner) {
      cursor.classList.remove('arrow');
      inner.style.opacity = "1";
    }
  };
  

  return (
    <motion.li
      style={{ backgroundSize: `100% ${progress}%`}}
      className="nav__item"
      variants={variants}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link href={href}>
        {label}
      </Link>
    </motion.li>
  );
}

export default NavItem;