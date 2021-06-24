import * as React from 'react';
import { motion } from "framer-motion";
import { useRecoilValue } from 'recoil';
import { pageRendered } from '../store';

const variants = {
  visible: {
    y: -60,
    x: '-50%',
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
  hidden: {
    y: 120,
    x: '-50%',
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
}


function Mouse(): JSX.Element {
  const rendered = useRecoilValue(pageRendered);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="mouse-scroll js-arrow"
    >
      <span className="mouse">
        <span className="mouse-movement" />
      </span>
      { rendered && rendered?.page === 'work' && (
        <span>Drag to Navigate</span>
      )}
    </motion.div>
  )
}

export default Mouse;