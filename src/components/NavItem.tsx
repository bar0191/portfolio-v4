import * as React from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useSetRecoilState } from 'recoil';
import { menuOpen } from '../store';

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
  const setOpen = useSetRecoilState(menuOpen);

  return (
    <motion.li
      className="nav__item"
      variants={variants}
      onClick={() => setOpen(false)}
    >
      <Link href={href}>
        {label}
      </Link>
    </motion.li>
  );
}

export default NavItem;