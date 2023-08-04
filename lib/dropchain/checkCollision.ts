import { CellState, Player, Position, Grid } from './types';

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
  if (player.content !== 0) {
    const nextY = player.pos.y + moveY;
    const nextX = player.pos.x + moveX;

    if (
      isMoveOutOfBounds(grid, nextY, nextX) ||
      isMoveBlocked(grid, nextY, nextX)
    ) {
      return true;
    }
  }
  return false;
};
