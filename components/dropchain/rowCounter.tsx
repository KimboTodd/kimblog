import React, { memo } from 'react';

const RowCounter = ({ links }) => {
  const chars = ['⠂', '⠆', '⠒', '⠲', '⠢', '⠖', '⠶'];
  return (
    <div
      className={`grid w-full grid-cols-7 border-2 border-solid border-green-600 `}
    >
      {Array.from(Array(7).keys()).map((_, i) => {
        return (
          <div
            key={i}
            className={`aspect-square text-xl lg:text-4xl ${
              i < links % 7 ? 'bg-green-600' : 'bg-slate-950'
            } border-2 border-slate-950`}
          >
            {chars[i]}
          </div>
        );
      })}
    </div>
  );
};

export default memo(RowCounter);
