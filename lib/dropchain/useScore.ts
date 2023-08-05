import { useCallback, useEffect, useState } from 'react';
import React from 'react';

type UseScoreReturnType = [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>
];

export const useScore = (chainsScored: number): UseScoreReturnType => {
  const [score, setScore] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  // Can we inline this?
  const calculateScore = useCallback(() => {
    const linePoints: number[] = [40, 100, 300, 1200];

    if (chainsScored > 0) {
      setScore(prev => prev + linePoints[chainsScored - 1] * (level + 1));
      setRows(prev => prev + chainsScored);
    }
  }, [level, chainsScored]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore, chainsScored, score]);

  return [score, setScore, rows, setRows, level, setLevel];
};
