import { CellState, Player, Position, Grid } from './types';

export const checkCollision = (
  player: Player,
  grid: Grid,
  { x: moveX, y: moveY }: Position
): boolean => {
  for (let y = 0; y < player.tetromino.length; y++) {
    const row = player.tetromino[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== 0) {
        const moveWithinBoardHeight = grid[y + player.pos.y + moveY];
        const moveWithinBoardWidth =
          grid[y + player.pos.y + moveY][x + player.pos.x + moveX];
        const moveToMergedCell =
          grid[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
          CellState.Clear;
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
