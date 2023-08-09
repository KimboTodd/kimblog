import { Link } from '../../lib/dropchain/types';

export const LINK = [
  { content: 0, color: 'text-slate-900' },
  { content: 1, color: 'text-yellow-600' },
  { content: 2, color: 'text-red-600' },
  { content: 3, color: 'text-blue-600' },
  { content: 4, color: 'text-pink-600' },
  { content: 5, color: 'text-purple-600' },
  { content: 6, color: 'text-orange-600' },
  { content: 7, color: 'text-teal-600' },
  { content: 0, color: 'text-green-600' }, // this is index 8, represents appearance of links
];

export const UNBREAKABLE = 8;
export const EMPTY = 0;

// Get a random chain, except for the first which is the placeholder
// and the last which is the merged chain
export const randomChain = (): Link =>
  LINK[Math.floor(Math.random() * (LINK.length - 2) + 1)];

export function* chainGenerator(): Generator<Link> {
  while (true) {
    let rnd = Math.random();
    console.log('chainGenerator rnd', rnd);
    let floorArg = rnd * (LINK.length - 2) + 1;
    console.log('chainGenerator floorArg', floorArg);
    let linkArg = Math.floor(floorArg);
    console.log('chainGenerator linkArg', linkArg);
    let linkResult = LINK[linkArg];
    console.log('chainGenerator linkResult', linkResult);
    yield linkResult;
  }
}
