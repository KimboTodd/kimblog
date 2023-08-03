import { CellValue, Tetromino } from '../../lib/tetris/types';

// TODO: change this to a binary array, no need to use chars
// Not: The shape need to be 1:1 or square so that the rotation function works correctly
export const TETROMINOS: Record<CellValue, Tetromino> = {
  X: { shape: [[0]], color: '0,0,0' },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: '80,227,230',
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: '36, 95, 223',
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: '223, 173, 36',
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '223, 217, 36',
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: '223, 217, 36',
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      [0, 'T', 0],
      [0, 0, 0],
    ],
    color: '132,61, 198',
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: '226, 78, 78',
  },
};

export const randomTetromino = (): Tetromino => {
  const cellValues = Object.keys(TETROMINOS);
  const randomTetromino =
    cellValues[Math.floor(Math.random() * cellValues.length)];
  return TETROMINOS[randomTetromino];
};
