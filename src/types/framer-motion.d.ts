import { Transition as FramerTransition } from 'framer-motion';

declare module 'framer-motion' {
  export interface MotionProps {
    transition?: FramerTransition | any;
  }
} 