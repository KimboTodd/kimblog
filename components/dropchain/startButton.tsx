import React, { memo } from 'react';

const StartButton = ({ callback }) => (
  <button
    className="mb-6 box-border w-full cursor-pointer border-none bg-gray-700 p-4 text-lg text-gray-50 outline-none"
    onClick={callback}
  >
    Start Game
  </button>
);

export default memo(StartButton);
