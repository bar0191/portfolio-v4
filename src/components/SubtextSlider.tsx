import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { wrap } from "popmotion";
import cx from 'classnames';
import { useRecoilValue } from 'recoil';
import { menuOpen } from '../store';

const itemVariants = {
  open: {
    x: 0.01,
    opacity: 1,
    transition: {
      x: { stiffness: 1000 }
    }
  },
  closed: {
    x: 50,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 }
    }
  }
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 85 : -85,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 85 : -85,
    opacity: 0
  })
};

function SubtextSlider({
  slides = ['test yo', 'another one'],
  label = '',
  swapped = false,
  still = false,
}): JSX.Element {
  const [[page, direction], setPage] = useState([0, 0]);
  const open = useRecoilValue(menuOpen);
  const progress = useAnimation();

  const imageIndex = wrap(0, slides.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const runProgress = async () => {
    await progress.start({
      x: 0.01,
      transition: {
        type: "tween",
        duration: 3,
      }
    });
    await progress.start({
      x: 18,
      transition: {
        type: "tween",
        duration: 1,
      }
    });
    await progress.start({
      x: -18,
      transition: {
        type: "tween",
        duration: 0,
      }
    });
    paginate(1);
  }

  useEffect(() => {
    runProgress().catch((e) => console.log(e));
  }, [page]);

  return (
    <motion.div
      initial="closed"
      animate={open ? "closed" : "open"}
      variants={staggerVariants}
      className={cx("slider__subtext", {swap: swapped, still})}
    >
      <motion.span variants={itemVariants} className="slider__subtext-progress">
        <motion.span animate={progress} initial={{ x: -18 }} className="slider__subtext-progress-active" />
      </motion.span>
      <motion.span variants={itemVariants} className="slider__subtext-content">
        <span>{label}</span>
        { !still && (
          <div className="slider__subtext-slide">
            <AnimatePresence initial={false} custom={direction}>
              <motion.span
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: "tween", duration: 0.5 },
                  opacity: { duration: 0.2 }
                }}
              >
                {slides[imageIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        )}
      </motion.span>
    </motion.div>


  );
}

export default SubtextSlider;