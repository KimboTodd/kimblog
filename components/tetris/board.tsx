import React from 'react';
import Cell from './cell';
import { Grid } from '../../lib/tetris/types';

const Board = ({ grid }: { grid: Grid }) => {
  return (
    <div
      className={`grid w-full max-w-md grid-cols-12 gap-1 border-2 border-solid border-gray-700 bg-gray-900`}
    >
      {grid.map(row => row.map((cell, x) => <Cell key={x} shape={cell[0]} />))}
    </div>
  );
};

export default Board;
