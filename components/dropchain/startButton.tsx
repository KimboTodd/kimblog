import React, { memo } from 'react';

const StartButton = ({ callback }) => (
  <button
    className="box-border w-full cursor-pointer border-4 border-double border-green-600 p-4 font-mono sm:text-xl lg:text-2xl text-green-500"
    onClick={callback}
  >
    START
  </button>
);

export default memo(StartButton);
