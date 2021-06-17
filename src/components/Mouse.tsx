import * as React from 'react';
import { motion } from "framer-motion";

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
    </motion.div>
  )
}

export default Mouse;