import React from 'react';
import Cell from './cell';
import { Grid } from '../../lib/dropchain/types';

const Board = ({ grid }: { grid: Grid }) => {
  const GRID_COLS_TAILWIND = 'grid-cols-7';

  return (
    <div
      className={`grid w-full max-w-md ${GRID_COLS_TAILWIND} gap-1 border-2 border-solid border-gray-700 bg-gray-900`}
    >
      {grid.map(row =>
        row.map((cell, x) => <Cell key={x} tetrominoName={cell[0]} />)
      )}
    </div>
  );
};

export default Board;
