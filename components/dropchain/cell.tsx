import React, { useEffect, useState } from 'react';
import { CHAINS_ARRAY } from './chains';
import { CellState } from '../../lib/dropchain/types';

const Cell = ({ fill, cell }) => {
  const [animationTimeoutId, setAnimationTimeoutId] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [cellState, setCellState] = useState({
    state: cell[1],
    content: CHAINS_ARRAY[fill].content ?? CHAINS_ARRAY[0].content,
    color: CHAINS_ARRAY[fill]?.color ?? CHAINS_ARRAY[0].color,
  });

  // To prevent tailwind tree-shaking these colors again, we must include them here
  // eslint-disable-next-line no-unused-vars
  const CHAIN_COLORS = [
    'text-yellow-400',
    'text-green-400',
    'text-blue-400',
    'text-red-400',
    'text-purple-400',
    'text-orange-400',
    'text-teal-400',
    'animate-ping',
  ];

  useEffect(() => {
    if (animating) {
      return;
    }

    if (cell[1] === CellState.Score) {
      setCellState(prevState => ({
        ...prevState,
        content: CHAINS_ARRAY[fill]?.content,
        state: CellState.Score,
      }));
      setAnimating(true);

      clearTimeout(animationTimeoutId);
      const newTimeoutId = setTimeout(() => {
        setCellState(prevState => ({
          ...prevState,
          content: CHAINS_ARRAY[fill]?.content,
          state: cell[1],
          color: CHAINS_ARRAY[fill].color,
        }));
        setAnimating(false);
      }, 500);
      setAnimationTimeoutId(newTimeoutId);
    } else {
      setCellState(prevState => ({
        ...prevState,
        content: CHAINS_ARRAY[fill]?.content,
        state: cell[1],
        color: CHAINS_ARRAY[fill].color,
      }));
    }
  }, [cell, animationTimeoutId, fill, animating, cellState.state]);

  return (
    <div
      className={`aspect-square ${cellState.color} ${
        cellState.state === CellState.Score ? 'animate-ping' : ''
      } flex items-center justify-center border-2 border-gray-800 text-3xl`}
    >
      {cellState.content}
    </div>
  );
};

// Only re-render the cells when they change
export default React.memo(Cell);
