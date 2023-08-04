/* eslint-disable no-unused-vars */
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
export type Cell = [fill: number, needsClearing: CellState];

export type Tetromino = {
  shape: Shape;
  color: string;
};

export type Shape = (string | number)[][];

export enum CellState {
  Clear = 'clear',
  Merged = 'merged',
  Score = 'score',
}
