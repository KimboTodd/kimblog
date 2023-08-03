import { useCallback, useState } from 'react';
import {
  TETROMINOS,
  randomTetromino,
} from '../../components/tetris/tetrominos';
import { GRID_WIDTH } from './grid';
import { checkCollision } from './checkCollision';
import { Player, Grid, TetrominoShape } from './types';

export const usePlayer = (): [
  Player,
  (args: { x: number; y: number; collided: boolean }) => void,
  () => void,
  (grid: Grid, dir: number) => void
] => {
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS['X'].shape,
    collided: false,
  });

  const rotate = (tetromino: TetrominoShape, dir: number) => {
    // Transpose rows and columns
    const rotatedTetromino = tetromino.map((_, index) =>
      tetromino.map(col => col[index])
    );

    // Reverse each row to get a rotated matrix
    // Moving a positive direction is clockwise
    // Moving negative is counter clockwise
    if (dir > 0) {
      return rotatedTetromino.map(row => row.reverse());
    } else {
      return rotatedTetromino.reverse();
    }
  };

  const playerRotate = (grid: Grid, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    // This function will help to move the tetromino so that
    // it will get pushed if it would move through another wall or tetromino
    const pos = clonedPlayer.pos;
    let offset = 1;
    while (checkCollision(clonedPlayer, grid, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      // create back and forth movement
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        // rotate back
        rotate(clonedPlayer.tetromino, -dir);
        // go back to same position as the beginning
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

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
      pos: { x: GRID_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
