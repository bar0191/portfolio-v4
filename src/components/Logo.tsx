import * as React from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { motion } from "framer-motion"
import { isLanding } from '../store';

function Logo(): JSX.Element | null {
  const landed = useRecoilValue(isLanding);

  return (
    <Link href='/' >
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="logo js-arrow">
        <motion.h1
          animate={{ x: landed ? 0 : -85}}
          initial={{ x: -85 }}
          className="logo__h1"
        >
          Brandon <br/> Reid
        </motion.h1>
      </a>
    </Link>
  );
}

export default Logo;