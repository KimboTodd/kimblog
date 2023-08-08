import { Chain } from '../../lib/dropchain/types';

export const CHAINS_ARRAY = [
  { content: 0, color: 'text-black-100' },
  { content: 1, color: 'text-yellow-600' },
  { content: 2, color: 'text-green-600' },
  { content: 3, color: 'text-blue-600' },
  { content: 4, color: 'text-red-600' },
  { content: 5, color: 'text-purple-600' },
  { content: 6, color: 'text-orange-600' },
  { content: 7, color: 'text-teal-600' },
];

// Get a random chain, except for the first which is the placeholder
export const randomChain = (): Chain =>
  CHAINS_ARRAY[Math.floor(Math.random() * (CHAINS_ARRAY.length - 1) + 1)];
