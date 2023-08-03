import { CellState, Player, Position, Grid } from './types';

const isFilledCell = (cell: string | number) => cell !== 0;

// Check that the next row/col to move isn't undefined, if so this is out of bounds
const isMoveOutOfBounds = (grid: Grid, nextY: number, nextX: number) =>
  !grid[nextY] || !grid[nextY][nextX];

const isMoveBlocked = (grid: Grid, nextY: number, nextX: number) =>
  grid[nextY][nextX][1] === CellState.Merged;

export const checkCollision = (
  player: Player,
  grid: Grid,
  { x: moveX, y: moveY }: Position
): boolean => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      if (isFilledCell(player.tetromino[y][x])) {
        const nextY = y + player.pos.y + moveY;
        const nextX = x + player.pos.x + moveX;

        if (
          isMoveOutOfBounds(grid, nextY, nextX) ||
          isMoveBlocked(grid, nextY, nextX)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
