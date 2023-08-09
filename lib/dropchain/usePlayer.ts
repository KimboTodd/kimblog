import { useCallback, useState } from 'react';
import { GRID_WIDTH } from './grid';
import { Player } from './types';
import { LINK, randomChain } from '../../components/dropchain/links';

export const usePlayer = (): [
  Player,
  (args: { x: number; y: number; collided: boolean; content?: number }) => void,
  () => void
] => {
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    content: LINK[0].content,
    collided: false,
  });

  const updatePlayerPos = ({
    x,
    y,
    collided,
    content,
  }: {
    x: number;
    y: number;
    collided: boolean;
    content?: number;
  }) => {
    setPlayer(prev => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      collided,
      content: content !== undefined ? content : prev.content,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: Math.floor(GRID_WIDTH / 2), y: 0 },
      content: randomChain().content,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
