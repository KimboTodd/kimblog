import React from 'react';

const Display = ({ gameOver, text }) => (
  <div
    className={`mb-6 box-border flex w-full border-4 border-solid border-gray-700 p-4 text-center ${
      gameOver ? 'text-red' : 'text-gray-600'
    } bg-black text-sm`}
  >
    {text}:
  </div>
);

export default Display;
