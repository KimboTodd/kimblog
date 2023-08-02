import React from 'react';
import { TETROMINOS } from './tetriminos';

const Cell = ({ type }) => {
  return (
    <div
      className={` aspect-square ${
        type === 0 ? 'border-0' : 'border-4'
      } border-b-opacity-10 border-r-opacity-100 border-t-opacity-100 border-l-opacity-30 border-0`}
      style={{
        borderBottomColor: `rgba(${TETROMINOS[type].color}, 0.1)`,
        borderRightColor: `rgba(${TETROMINOS[type].color}, 1)`,
        borderTopColor: `rgba(${TETROMINOS[type].color}, 1)`,
        borderLeftColor: `rgba(${TETROMINOS[type].color}, 0.3)`,
        backgroundColor: `rgba(${TETROMINOS[type].color}, 0.8)`,
      }}
    ></div>
  );
};

export default Cell;
