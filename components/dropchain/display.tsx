import React, { memo, useEffect, useState } from 'react';

const Display = ({ text, flash }) => {
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    if (!flash) return;

    setFlashing(true);
    const timeout = setTimeout(() => {
      setFlashing(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [text, flash]);

  return (
    <div
      className={`box-border flex w-full animate-crtBlurText p-1 ${
        flashing ? 'animate-flashWhite' : ''
      } border-2 border-dashed border-green-700 p-2 text-center font-mono text-base text-green-500 md:text-base lg:text-2xl`}
    >
      {text}
    </div>
  );
};

export default memo(Display);
