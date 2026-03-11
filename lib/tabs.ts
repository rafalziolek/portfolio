import type { Transition } from 'framer-motion';

export type Tab = 'info' | 'works';

export const tabTransition: Transition = {
  type: 'spring',
  duration: 0.4,
  bounce: 0.0,
};
