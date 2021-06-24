import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { wrap } from "popmotion";

const wrapperVariants = {
  visible: {
    x: -41,
    y: '-50%',
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
  hidden: {
    x: 100,
    y: '-50%',
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
}

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 85 : -85,
  }),
  center: {
    zIndex: 1,
    y: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 85 : -85,
  })
};

function SliderCounter({ length, index, direction }): JSX.Element {
  const [[page, dir], setPage] = useState([1, 0]);
  const progress = useAnimation();

  const posIndex = wrap(0, length, page);

  const paginate = (newDirection: number) => {
    console.log(page);
    setPage([page + newDirection, newDirection]);
  };

  const runAnimations = async () => {
    const newDir = Math.sign(direction);

    if (newDir > 0) {
      await progress.start({
        x: 40,
        transition: {
          type: "tween",
          duration: 0.6,
        }
      });
      paginate(newDir);
      await progress.start({
        x: -40,
        transition: {
          type: "tween",
          duration: 0,
        }
      });
      await progress.start({
        x: ((posIndex - length + 1) * 10),
        transition: {
          type: "tween",
          duration: 1,
        }
      });
    } else {
      paginate(newDir);
      await progress.start({
        x: ((posIndex - 1) * -10),
        transition: {
          type: "tween",
          duration: 1,
        }
      });
    }
  }

  useEffect(() => {
    if (page !== index) {
      runAnimations().catch((e) => console.log(e));
    }
  }, [direction]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={wrapperVariants}
      className="slider__counter"
    >
      <div className="slider__counter-active">
        <AnimatePresence initial={false} custom={dir}>
          <motion.span
            key={page}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "tween", duration: 0.4 },
            }}
          >
            { (posIndex === 0) ? length : posIndex }
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="slider__counter-hr">
        <div className="slider__counter-hr-wrapper">
          <motion.span animate={progress} initial={{ x: -40 }} className="slider__subtext-progress-active" />
          <div className="slider__counter-hr-total" />
        </div>
      </div>
      <div className="slider__counter-total">
        <span>{length}</span>
      </div>
    </motion.div>
  );
}

export default SliderCounter;