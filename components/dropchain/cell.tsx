import React from 'react';
import { CHAINS } from './chains';
import { TetrominoName } from '../../lib/dropchain/types';

const Cell = ({ tetrominoName }: { tetrominoName: TetrominoName | number }) => {
  const color = CHAINS[tetrominoName]?.color ?? CHAINS[TetrominoName.X].color;
  const content =
    CHAINS[tetrominoName]?.shape[0][0] ?? CHAINS[TetrominoName.X].shape[0][0];
  console.log('color', color);
  console.log('tetrominoName', tetrominoName);
  return (
    <div
      className={`aspect-square ${color} ${
        tetrominoName === TetrominoName.X
          ? 'border-0'
          : 'border-1 border-gray-800'
      } border-b-opacity-10 border-r-opacity-100 border-t-opacity-100 border-l-opacity-30 border-0`}
    >
      {content}
    </div>
  );
};

// Only re-render the cells when they change
export default React.memo(Cell);
