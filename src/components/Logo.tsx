import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { motion, useMotionValue, animate } from "framer-motion"
import { isLanding } from '../store';

const { useEffect, useState } = React;

function Logo(): JSX.Element | null {
  const landed = useRecoilValue(isLanding);

  useEffect(() => {

  }, [landed]);

  return (
    <div className="logo">
      <motion.h1
        animate={{ x: landed ? 0 : -85}}
        initial={{ x: -85 }}
        className="logo__h1"
      >
        Brandon <br/> Reid
      </motion.h1>
    </div>
  );
}

export default Logo;