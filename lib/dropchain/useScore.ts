import { useCallback, useEffect, useState } from 'react';

export const useScore = (
  chainsScored: number
): [number, number, number, () => void] => {
  const [score, setScore] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  const resetScore = useCallback(() => {
    setScore(0);
    setRows(0);
    setLevel(1);
  }, []);

  useEffect(() => {
    if (chainsScored > 0) {
      // Increment level every 7 chains broken
      if (rows + chainsScored >= level * 7) {
        setLevel(prev => prev + 1);
      }

      const linePoints: number[] = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
      setScore(prev => prev + linePoints[chainsScored - 1] * (level + 1));
      setRows(prev => prev + chainsScored);
    }
    // calculateLevel();
  }, [chainsScored, level, rows]);

  return [score, rows, level, resetScore];
};
