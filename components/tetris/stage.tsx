import React from 'react';
import Cell from './cell';

const Stage = ({ stage }) => {
  return (
    <div
      id="stage"
      className={`grid w-full max-w-md grid-cols-12 gap-1 border-2 border-solid border-gray-700 bg-gray-900`}
    >
      {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </div>
  );
};

export default Stage;
