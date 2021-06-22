import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function CarouselItem({ item, controls, index }) {
  return(
    <Link href={item.href}>
      <motion.a
        className="carousel__link"
        custom={{ index }}
        animate={controls}
      >
        <div className="carousel__label">{item.count}</div>
        <figure className="carousel__figure">
          <img className="gl-slide-scene" src={item.image} alt={item.label} />
        </figure>
      </motion.a>
    </Link>
  )
}

export default CarouselItem;