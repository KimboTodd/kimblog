import React from 'react';
import { CHAINS_ARRAY } from './chains';
import { TetrominoName } from '../../lib/dropchain/types';

const Cell = ({ tetrominoName }: { tetrominoName: TetrominoName | number }) => {
  // To prevent tailwind tre-shaking these colors again, we must include them here
  const CHAIN_COLORS = [
    'text-yellow-300',
    'text-green-300',
    'text-blue-300',
    'text-red-300',
    'text-purple-300',
    'text-orange-300',
    'text-teal-300',
  ];

  const color: string =
    CHAINS_ARRAY[tetrominoName]?.color ?? CHAINS_ARRAY[0].color;
  const content =
    CHAINS_ARRAY[tetrominoName]?.shape[0][0] ?? CHAINS_ARRAY[0].shape[0][0];
  return (
    <div
      className={`aspect-square ${color} border-2 border-gray-800 text-center align-middle text-lg`}
    >
      {content}
    </div>
  );
};

// Only re-render the cells when they change
export default React.memo(Cell);
