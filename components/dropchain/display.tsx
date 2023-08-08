import React, { memo } from 'react';

const Display = ({ text }) => (
  <div
    className={`mb-6 box-border flex w-full animate-crtBlurText border-2 border-dashed 
    border-green-700 p-2 text-center font-mono text-lg text-green-500`}
  >
    {text}
  </div>
);

export default memo(Display);
