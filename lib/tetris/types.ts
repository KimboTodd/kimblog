export type Player = {
  pos: Position;
  tetromino: TetrominoShape;
  collided: boolean;
};

export type Position = {
  x: number;
  y: number;
};

export type Tetromino = {
  shape: TetrominoShape;
  color: string;
};

export type TetrominoShape = (string | number)[][];

export type Grid = Cell[][];

export type Cell = [shape: CellValue, needsClearing: CellState];

// TODO: Decide to use type or enum
export type CellValue = 'X' | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';
export enum CellState {
  Clear = 'clear',
  Merged = 'merged',
}
