import { Player, Position, Stage } from '../../lib/tetrisHooks/types';

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = (): Stage =>
  Array.from(Array(STAGE_HEIGHT), () =>
    Array(STAGE_WIDTH).fill(['X', 'clear'])
  );

export const checkCollision = (
  player: Player,
  stage: Stage,
  { x: moveX, y: moveY }: Position
): boolean => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      const tetrominoIsNotBlank = player.tetromino[y][x] !== 'X';
      if (tetrominoIsNotBlank) {
        const moveWithinBoardHeight = stage[y + player.pos.y + moveY];
        const moveWithinBoardWidth =
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX];
        const moveToMergedCell =
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
          'clear';
        if (
          !moveWithinBoardHeight ||
          !moveWithinBoardWidth ||
          moveToMergedCell
        ) {
          return true;
        }
      }
    }
  }
};
