import * as React from 'react';
import { motion } from 'framer-motion';

const variants = {
  enter: {
    opacity: 0,
    transition: {
      duration: 0.3,
      delay: 0.8,
    }
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.8,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    }
  }
}

function Tags({ data }): JSX.Element {

  return (
    <motion.ul className="tags" variants={variants}>
      <li className="tags__item">
        <div>
          <span className="tags__label">Client</span>
          <span>{data.client}</span>
        </div>
      </li>
      <li className="tags__item">
        <div>
          <span className="tags__label">Agency</span>
          <span>{data.agency}</span>
        </div>
      </li>
      <li className="tags__item">
        <div>
          <span className="tags__label">Status</span>
          <span>{data.status}</span>
        </div>
      </li>
      <li className="tags__item">
        <div>
          <span className="tags__label">Role</span>
          <span>{data.role}</span>
        </div>
      </li>
      <li className="tags__item">
        <div>
          <span className="tags__label">Tech</span>
          <span>{data.tech}</span>
        </div>
      </li>
    </motion.ul>
  );
}

export default Tags;