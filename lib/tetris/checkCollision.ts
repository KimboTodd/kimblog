import { Player, Position, Stage } from './types';

export const checkCollision = (
  player: Player,
  stage: Stage,
  { x: moveX, y: moveY }: Position
): boolean => {
  for (let y = 0; y < player.tetromino.length; y++) {
    const row = player.tetromino[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== 0) {
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
  return false;
};
