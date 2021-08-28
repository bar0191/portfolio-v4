import * as React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useRecoilValue } from 'recoil';
import { menuOpen } from '../store';
import NavItem from './NavItem';

const variants = {
  center: { transition: { staggerChildren: 0.07, delayChildren: 0.2 }},
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 }}
};

function Nav(): JSX.Element {
  const open = useRecoilValue(menuOpen);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          initial="enter"
          animate="center"
          exit="exit"
          className="nav"
        >
          <motion.ul className="nav__list" variants={variants}>
            <NavItem href='/' label='Home' />
            <NavItem href='/about' label='About' />
            <NavItem href='/work' label='Work' />
            <NavItem href='https://b-reid.dribbble.com/' label='3D Art' />
            <NavItem href='/contact' label='Contact' />
          </motion.ul>
        </motion.nav>
      )}

    </AnimatePresence>

  );
}

export default Nav;