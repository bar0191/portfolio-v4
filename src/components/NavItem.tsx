import * as React from 'react';
import { motion } from "framer-motion";

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

  return (
    <motion.li
      className="nav__item"
      variants={variants}
    >
      test
    </motion.li>
  );
}

export default NavItem;