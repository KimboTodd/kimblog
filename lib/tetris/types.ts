export type Player = {
  pos: Position;
  tetromino: Shape;
  collided: boolean;
};

export type Position = {
  x: number;
  y: number;
};

export type Grid = Cell[][];

export type Cell = [shape: TetrominoName, needsClearing: CellState];

export type TetrominoName = 'X' | 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export type Tetromino = {
  shape: Shape;
  color: string;
};

export type Shape = (string | number)[][];

export enum CellState {
  Clear = 'clear',
  Merged = 'merged',
}
