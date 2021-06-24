import * as React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import cx from 'classnames';
import { motion } from "framer-motion";
import { isRayZoomed, isWorkRendered, menuOpen } from '../store';

const variants = {
  visible: {
    x: 0,
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
  hidden: {
    x: -160,
    transition: {
      duration: 1,
      delay: 0.2,
    },
  },
}

function Hamburger(): JSX.Element {
  const [open, setOpen] = useRecoilState(menuOpen);
  const [zoomed, setZoomed] = useRecoilState(isRayZoomed);
  const setWorkRendered = useSetRecoilState(isWorkRendered);

  return (
    <motion.div
      onClick={() => {
        setOpen(!open);
        setZoomed(!zoomed);
        setWorkRendered(false);
      }}
      initial="hidden"
      animate="visible"
      variants={variants}
      className='hamburger js-arrow'
    >
      <div className="circle">
        <div className={cx("circlePlay", { open })} id="nav-button">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </motion.div>
  );
}

export default Hamburger;