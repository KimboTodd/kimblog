import React, { useEffect, useState } from 'react';
import { CHAINS_ARRAY } from './chains';
import { CellState } from '../../lib/dropchain/types';

const Cell = ({ fill, cell, stagingRow }) => {
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
    'text-yellow-600',
    'text-green-600',
    'text-blue-600',
    'text-red-600',
    'text-purple-600',
    'text-orange-600',
    'text-teal-600',
    'text-pink-600',
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

  return stagingRow ? (
    <div
      className={`aspect-square font-mono ${cellState.color} border-top-2 flex items-center justify-center border-b-2 border-t-2 border-green-600 text-3xl`}
    >
      ({cellState.content})
    </div>
  ) : (
    <div
      className={`aspect-square font-mono ${cellState.color} ${
        cellState.state === CellState.Score ? 'animate-ping' : ''
      } flex items-center justify-center border-2 border-green-600 text-3xl`}
    >
      ({cellState.content})
    </div>
  );
};

// Only re-render the cells when they change
export default React.memo(Cell);
