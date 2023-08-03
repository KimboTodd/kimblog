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

// Can we work towards a number only?
export type Cell = [fill: number | TetrominoName, needsClearing: CellState];

export type Tetromino = {
  shape: Shape;
  color: string;
};

export type Shape = (string | number)[][];

// TODO: Decide to use type or enum
export enum TetrominoName {
  X = 'X',
  I = 'I',
  J = 'J',
  L = 'L',
  O = 'O',
  S = 'S',
  T = 'T',
  Z = 'Z',
}

export enum CellState {
  Clear = 'clear',
  Merged = 'merged',
}
