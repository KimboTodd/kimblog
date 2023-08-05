import React, { memo } from 'react';

const Display = ({ gameOver, text }) => (
  <div
    className={`mb-6 box-border flex w-full border-4 border-solid border-gray-700 p-4 text-center 
    ${gameOver ? 'text-red-500' : 'text-neutral-500'} bg-black text-sm`}
  >
    {text}
  </div>
);

export default memo(Display);
