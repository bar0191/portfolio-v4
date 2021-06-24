import * as React from 'react';
import { motion } from 'framer-motion';
import Tags from './Tags';

const itemVariants = {
  enter: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.3,
    }
  },
  center: {
    y: 0.0,
    opacity: 1,
    transition: {
      duration: 0.3,
    }
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  }
}

const variants = {
  enter: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    }
  },
  center: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      //staggerDirection: -1,
    }
  }
};

function Headline({ headline, quote, open, tags }): JSX.Element {
  const value = headline.split(' ');
  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      variants={variants}
    >
      <motion.blockquote
        variants={variants}
      >
        {quote && (
          /*<motion.span variants={itemVariants} className="front">&quot;</motion.span>*/
          <></>
        )}
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {value.map((v: string, index: number) => (
          <motion.span
            variants={itemVariants}
            key={v + index.toString()}
          >
            {v}
            &nbsp;
          </motion.span>
        ))}
        { quote && (
          /*<motion.span variants={itemVariants} className="end">&quot;</motion.span>*/
          <></>
        )}
      </motion.blockquote>
      { tags && (
        <Tags data={tags} />
      )}
    </motion.div>
  );
}

export default Headline;