import { useCallback, useEffect, useState } from 'react';

export const useScore = (
  chainsScored: number,
  links: number
): [number, number, () => void] => {
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [scoreSound, setScoreSound] = useState(null);

  const resetScore = useCallback(() => {
    setScore(0);
    setLevel(1);
  }, []);

  useEffect(() => {
    if (chainsScored > 0) {
      const sound = new Audio(
        '/assets/blog/dropchain/audio/confirmation_001.ogg'
      );
      sound.play();
      setScoreSound(sound);
    }
  }, [chainsScored]);

  useEffect(() => {
    if (scoreSound) {
      scoreSound.addEventListener('ended', () => {
        scoreSound.remove();
        setScoreSound(null);
      });
    }
  }, [scoreSound]);

  useEffect(() => {
    if (chainsScored <= 0) return;

    if (links >= level * 7) {
      setLevel(prev => prev + 1);
    }

    const multiplier: number[] = [10, 20, 30, 50, 80, 130, 210, 340, 550, 890];
    setScore(prev => prev + multiplier[chainsScored - 1] * level);
  }, [chainsScored, level, links]);

  return [score, level, resetScore];
};
