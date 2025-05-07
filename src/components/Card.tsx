"use client";

import { Box, BoxProps } from '@chakra-ui/react';
import { motion, Transition } from 'framer-motion';

const MotionBox = motion(Box);

interface CardProps extends BoxProps {
  children: React.ReactNode;
}

export const Card = ({ children, ...props }: CardProps) => {
  const transition: Transition = {
    type: 'spring',
    stiffness: 400,
    damping: 17,
  };

  return (
    <MotionBox
      p={6}
      borderRadius="xl"
      backdropFilter="blur(10px)"
      bg="whiteAlpha.800"
      boxShadow="lg"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
      transition={transition}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export default Card; 