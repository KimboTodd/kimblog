import React from 'react';
import Cell from './cell';
import { Grid } from '../../lib/dropchain/types';

const Board = ({ grid }: { grid: Grid }) => {
  return (
    <div
      className={`grid w-full grid-cols-7 border-4 border-b-4 border-double border-green-600`}
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
