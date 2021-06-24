import * as React from 'react';
import Link from 'next/link';
import { animate, motion } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { isLinkHover, isWorkRendered, menuOpen } from '../store';

const variants = {
  enter: {
    x: -150,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 350,
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  }
};

function NavItem({ href, label }): JSX.Element {
  const setOnHover = useSetRecoilState(isLinkHover);
  const [progress, setProgress] = useState(0);
  const setOpen = useSetRecoilState(menuOpen);
  const [cursor, setCursor] = useState(null);
  const [cursorInner, setCursorInner] = useState(null);
  const setWorkRendered = useSetRecoilState(isWorkRendered);

  useEffect(() => {
    setCursor(document.querySelector('#cursor'));
    setCursorInner(document.querySelector('.cursor'));
  }, []);

  const onEnter = () => {
    setOnHover(true);
    animate(progress, 100, {
      duration: 0.8,
      onUpdate: (v) => setProgress(v),
    });
    cursor.classList.add('arrow');
    cursorInner.style.opacity = "0";
  };

  const onLeave = () => {
    setOnHover(false);
    animate(progress, 0, {
      duration: 0.8,
      onUpdate: (v) => setProgress(v),
    });
    cursor.classList.remove('arrow');
    cursorInner.style.opacity = "1";
  };

  const onClick = () => {
    setWorkRendered(false);
    setTimeout(() => {
      setOpen(false);
      setOnHover(false);
    }, 300);
    cursor.classList.remove('arrow');
    cursorInner.style.opacity = "1";
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