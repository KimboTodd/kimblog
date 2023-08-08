import React from 'react';
import Cell from './cell';
import { Grid } from '../../lib/dropchain/types';

const Board = ({ grid }: { grid: Grid }) => {
  return (
    <div
      className={`mb-6 grid w-full max-w-md grid-cols-7 border-d border-2 border-b-4 border-green-600`}
    >
      {grid.map((row, i) =>
        row.map((cell, x) => {
          return (
            <Cell key={x} cell={cell} fill={cell[0]} stagingRow={i === 0} />
          );
        })
      )}
    </div>
  );
};

export default Board;
