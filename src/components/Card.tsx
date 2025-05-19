"use client";

import { BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Create a motion div instead of using motion(Box)
const MotionDiv = motion.div;

interface CardProps extends Omit<BoxProps, 'transition'> {
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <MotionDiv
      style={{
        padding: '1.5rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      whileHover={{ 
        y: -4, 
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        scale: 1.02 
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </MotionDiv>
  );
};

export default Card; 