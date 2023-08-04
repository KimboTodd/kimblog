import { Tetromino } from '../../lib/dropchain/types';

// TODO: change this to a binary array, no need to use chars
// Not: The shape need to be 1:1 or square so that the rotation function works correctly
export const CHAINS: Record<string, Tetromino> = {
  X: { shape: [[0]], color: 'text-black-100' },
  I: {
    shape: [[1]],
    color: 'text-yellow-400',
  },
  J: {
    shape: [[2]],
    color: 'text-green-400',
  },
  L: {
    shape: [[3]],
    color: 'text-blue-400',
  },
  O: {
    shape: [[4]],
    color: 'text-red-400',
  },
  S: {
    shape: [[5]],
    color: 'text-purple-400',
  },
  T: {
    shape: [[6]],
    color: 'text-orange-400',
  },
  Z: {
    shape: [[7]],
    color: 'text-teal-400',
  },
};

export const CHAINS_ARRAY = Object.values(CHAINS);

export const randomChain = (): Tetromino => {
  const cellValues = Object.keys(CHAINS);
  // Get a random tetromino, except for the first which is the placeholder
  const randomTetromino =
    cellValues[Math.floor(Math.random() * (cellValues.length - 1) + 1)];
  return CHAINS[randomTetromino];
};
