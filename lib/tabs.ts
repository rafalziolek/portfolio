import type { Transition } from 'framer-motion';

export type Tab = 'info' | 'works';

export const tabTransition: Transition = {
  type: 'tween',
  duration: 0.6,
  ease: [0.175, 0.885, 0.32, 1.1],
};
