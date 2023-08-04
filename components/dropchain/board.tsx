import React from 'react';
import Cell from './cell';
import { Grid } from '../../lib/dropchain/types';

const Board = ({ grid }: { grid: Grid }) => {
  return (
    <div
      className={`grid w-full max-w-md grid-cols-7 gap-1 border-2 border-solid border-gray-700 bg-gray-900`}
    >
      {grid.map(row =>
        row.map((cell, x) => <Cell key={x} cell={cell} fill={cell[0]} />)
      )}
    </div>
  );
};

export default Board;
