import { useCallback, useEffect, useState } from 'react';

export const useScore = (
  linksBroken: number,
  linksDropped: number
): [number, number, () => void] => {
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [scoreSound, setScoreSound] = useState(null);

  const resetScore = useCallback(() => {
    setScore(0);
    setLevel(1);
  }, []);

  useEffect(() => {
    if (linksBroken > 0) {
      const sound = new Audio('/assets/blog/dropchain/confirmation_001.ogg');
      sound.play();
      setScoreSound(sound);
    }
  }, [linksBroken]);

  useEffect(() => {
    if (scoreSound) {
      scoreSound.addEventListener('ended', () => {
        scoreSound.remove();
        setScoreSound(null);
      });
    }
  }, [scoreSound]);

  useEffect(() => {
    if (linksBroken < 1) return;

    if (linksDropped >= level * 7) {
      setLevel(prev => prev + 1);
    }

    const fibonacci = (n: number) => {
      if (n <= 1) {
        return n;
      }
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    const multiplier = fibonacci(linksBroken);
    setScore(prev => prev + multiplier[linksBroken - 1]);
  }, [linksBroken, level, linksDropped]);

  return [score, level, resetScore];
};
