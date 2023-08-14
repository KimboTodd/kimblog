import React, { memo } from 'react';

const InverseDisplay = ({ gameOver, text }) => {
  return (
    <div
      className={`mb-6 box-border flex w-full border-2 border-solid border-green-700 font-bold bg-green-600 p-4 text-center font-mono 
    ${gameOver ? 'text-slate-800' : 'text-slate-900'}  text-xl`}
    >
      {text}
    </div>
  );
};

export default memo(InverseDisplay);
