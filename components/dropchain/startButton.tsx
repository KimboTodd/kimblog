import React, { memo } from 'react';

const StartButton = ({ callback }) => (
  <button
    className="mb-6 box-border w-full cursor-pointer border-4 border-neutral-600 p-4 text-lg text-neutral-300 outline-none"
    onClick={callback}
  >
    Start Game
  </button>
);

export default memo(StartButton);
