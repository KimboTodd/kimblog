import { useCallback, useState } from 'react';
import {
  TETROMINOS,
  randomTetromino,
} from '../../components/tetris/tetrominos';
import { STAGE_WIDTH } from '../../components/tetris/gameHelpers';
import { Player } from './types';

export const usePlayer = (): [
  Player,
  (args: { x: number; y: number; collided: boolean }) => void,
  () => void
] => {
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS['X'].shape,
    collided: false,
  });

  const updatePlayerPos = ({
    x,
    y,
    // collided,
  }: {
    x: number;
    y: number;
    collided: boolean;
  }) => {
    setPlayer(prev => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
      // collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer];
};
