"use client";

import { Button, ButtonProps, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Create a motion div
const MotionBox = motion(Box);

interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  as?: 'a' | 'button';
}

export const PrimaryButton = ({ children, variant = 'primary', ...props }: PrimaryButtonProps) => {
  return (
    <MotionBox
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: 'spring',
        stiffness: 400, 
        damping: 17 
      }}
      display="inline-block"
    >
      <Button
        variant={variant}
        position="relative"
        overflow="hidden"
        _after={{
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '5px',
          height: '5px',
          background: 'rgba(255, 255, 255, 0.5)',
          opacity: 0,
          borderRadius: '100%',
          transform: 'scale(1, 1) translate(-50%)',
          transformOrigin: '50% 50%',
        }}
        _hover={{
          _after: {
            animation: 'ripple 1s ease-out',
          },
        }}
        {...props}
      >
        {children}
      </Button>
    </MotionBox>
  );
};

// Add the ripple animation to your global CSS
const styles = `
@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(100, 100);
    opacity: 0;
  }
}
`;

export default PrimaryButton; 