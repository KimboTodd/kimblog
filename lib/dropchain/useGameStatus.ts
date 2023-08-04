import { useCallback, useEffect, useState } from 'react';
import React from 'react';

type UseGameStatusReturnType = [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>
];

export const useGameStatus = (chainsCleared: number): UseGameStatusReturnType => {
  const [score, setScore] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  // Can we inline this?
  const calculateScore = useCallback(() => {
    const linePoints: number[] = [40, 100, 300, 1200];

    if (chainsCleared > 0) {
      setScore(prev => prev + linePoints[chainsCleared - 1] * (level + 1));
      setRows(prev => prev + chainsCleared);
    }
  }, [level, chainsCleared]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore, chainsCleared, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
