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
      className={`box-border flex w-full animate-crtBlurText ${
        flashing ? 'animate-flashWhite' : ''
      } border-2 border-dashed border-green-700 p-2 text-center font-mono text-2xl text-green-500`}
    >
      {text}
    </div>
  );
};

export default memo(Display);
