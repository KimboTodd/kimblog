import React, { memo, useEffect, useState } from 'react';

const InverseDisplay = ({ gameOver, text }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      const textCopy = text.toUpperCase();
      if (i < textCopy.length) {
        setContent(prevContent => prevContent + textCopy.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div
      className={`mb-6 box-border flex w-full border-2 border-solid border-green-700 bg-green-600 p-4 text-center font-mono 
    ${
      gameOver ? 'text-slate-800' : 'text-slate-950'
    } animate-crtBlurText text-xl`}
    >
      {content}
    </div>
  );
};

export default memo(InverseDisplay);
