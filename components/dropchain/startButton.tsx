import React, { memo } from 'react';

const StartButton = ({ callback }) => (
  <button
    className="mb-6 box-border w-full animate-crtBlurText cursor-pointer border-2 border-green-600 p-2 font-mono text-2xl text-green-500"
    onClick={callback}
  >
    START
  </button>
);

export default memo(StartButton);
