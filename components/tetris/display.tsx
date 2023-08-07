import React, { memo } from 'react';

const Display = ({ gameOver, text }) => (
  <div
    className={`mb-6 box-border flex w-full border-4 border-solid border-breige-500 p-4 text-center 
    ${gameOver ? 'text-red-500' : 'border-breige-500'} bg-slate-550 text-sm`}
  >
    {text}
  </div>
);

export default memo(Display);
