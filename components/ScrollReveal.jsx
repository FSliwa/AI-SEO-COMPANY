'use client';

import { motion } from 'framer-motion';

const EASE = [0.7, 0, 0.3, 1]; // Premium cubic-bezier easing

export function Reveal({ children, delay = 0, className = '', style = {}, ...props }) {
  return (
    <motion.div
      initial={{ y: 30 }}
      whileInView={{ opacity: [0, 1], y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({ children, className = '', style = {}, delay = 0, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: delay
          }
        }
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = '', style = {}, ...props }) {
  return (
    <motion.div
      variants={{
        hidden: { y: 30 },
        visible: {
          opacity: [0, 1],
          y: 0,
          transition: { duration: 0.8, ease: EASE }
        }
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
