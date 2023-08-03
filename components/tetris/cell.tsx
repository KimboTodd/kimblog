import React from 'react';
import { TETROMINOS } from './tetrominos';
import { TetrominoName } from '../../lib/tetris/types';

const Cell = ({ tetrominoName }: { tetrominoName: TetrominoName | number }) => {
  const color =
    TETROMINOS[tetrominoName]?.color ?? TETROMINOS[TetrominoName.X].color;
  return (
    <div
      className={`aspect-square ${
        tetrominoName === TetrominoName.X ? 'border-0' : 'border-4'
      } border-b-opacity-10 border-r-opacity-100 border-t-opacity-100 border-l-opacity-30 border-0`}
      style={{
        borderBottomColor: `rgba(${color}, 0.1)`,
        borderRightColor: `rgba(${color}, 1)`,
        borderTopColor: `rgba(${color}, 1)`,
        borderLeftColor: `rgba(${color}, 0.3)`,
        backgroundColor: `rgba(${color}, 0.8)`,
      }}
    ></div>
  );
};

// Only re-render the cells when they change
export default React.memo(Cell);
