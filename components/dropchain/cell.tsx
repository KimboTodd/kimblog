import React from 'react';
import { CHAINS_ARRAY } from './chains';
import { CellState } from '../../lib/dropchain/types';

const Cell = ({ fill, cell }) => {
  // To prevent tailwind tre-shaking these colors again, we must include them here
  const CHAIN_COLORS = [
    'text-yellow-400',
    'text-green-400',
    'text-blue-400',
    'text-red-400',
    'text-purple-400',
    'text-orange-400',
    'text-teal-400',
    'animate-ping',
  ];

  const color: string = CHAINS_ARRAY[fill]?.color ?? CHAINS_ARRAY[0].color;
  const content = CHAINS_ARRAY[fill]?.content ?? CHAINS_ARRAY[0].content;
  if (cell[1] === CellState.Score) {
    console.log('cell score 🔥');
  }
  return (
    <div
      className={`aspect-square ${color} ${
        cell[1] === CellState.Score ? 'animate-ping' : ''
      } flex items-center justify-center border-2 border-gray-800 text-3xl`}
    >
      {content}
    </div>
  );
};

// Only re-render the cells when they change
export default React.memo(Cell);
