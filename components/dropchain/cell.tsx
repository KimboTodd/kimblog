import React from 'react';
import { CHAINS_ARRAY } from './chains';
import { TetrominoName } from '../../lib/dropchain/types';

const Cell = ({ tetrominoName }: { tetrominoName: TetrominoName | number }) => {
  // To prevent tailwind tre-shaking these colors again, we must include them here
  const CHAIN_COLORS = [
    'text-yellow-400',
    'text-green-400',
    'text-blue-400',
    'text-red-400',
    'text-purple-400',
    'text-orange-400',
    'text-teal-400',
  ];

  const color: string =
    CHAINS_ARRAY[tetrominoName]?.color ?? CHAINS_ARRAY[0].color;
  const content =
    CHAINS_ARRAY[tetrominoName]?.shape[0][0] ?? CHAINS_ARRAY[0].shape[0][0];
  return (
    <div
      className={`aspect-square ${color} flex items-center justify-center border-2 border-gray-800 text-3xl`}
    >
      {content}
    </div>
  );
};

// Only re-render the cells when they change
export default React.memo(Cell);
