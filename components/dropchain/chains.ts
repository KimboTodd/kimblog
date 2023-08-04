import { Chain } from '../../lib/dropchain/types';

export const CHAINS_ARRAY = [
  { content: 0, color: 'text-black-100' },
  { content: 1, color: 'text-yellow-400' },
  { content: 2, color: 'text-green-400' },
  { content: 3, color: 'text-blue-400' },
  { content: 4, color: 'text-red-400' },
  { content: 5, color: 'text-purple-400' },
  { content: 6, color: 'text-orange-400' },
  { content: 7, color: 'text-teal-400' },
];

// Get a random chain, except for the first which is the placeholder
export const randomChain = (): Chain =>
  CHAINS_ARRAY[Math.floor(Math.random() * (CHAINS_ARRAY.length - 1) + 1)];
