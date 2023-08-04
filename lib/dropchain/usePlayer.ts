import { useCallback, useState } from 'react';
import { GRID_WIDTH } from './grid';
import { Player } from './types';
import { CHAINS_ARRAY, randomChain } from '../../components/dropchain/chains';

export const usePlayer = (): [
  Player,
  (args: { x: number; y: number; collided: boolean }) => void,
  () => void
] => {
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: CHAINS_ARRAY[0].shape,
    collided: false,
  });

  const updatePlayerPos = ({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided?: boolean;
  }) => {
    setPlayer(prev => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: Math.floor(GRID_WIDTH / 2), y: 0 },
      tetromino: randomChain().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
