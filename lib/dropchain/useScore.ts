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
    const fibonacci = (n: number): number => {
      if (n === 0) return 0;
      if (n === 1) return 1;
      return fibonacci(n - 1) + fibonacci(n - 2);
    };

    if (linksBroken <= 0) return;

    if (linksDropped >= level * 7) {
      setLevel(prev => prev + 1);
    }

    var multiplier = fibonacci(linksBroken) * 10;
    setScore(prev => prev + multiplier);
  }, [linksBroken, level, linksDropped]);

  return [score, level, resetScore];
};
