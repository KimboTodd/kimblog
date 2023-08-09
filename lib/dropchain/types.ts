/* eslint-disable no-unused-vars */
export type Player = {
  pos: Position;
  content: number;
  collided: boolean;
};

export type Position = {
  x: number;
  y: number;
};

export type Grid = Cell[][];

// Can we work towards a number only?
export type Cell = [content: number, cellState: CellState];

export type Link = {
  content: number;
  color: string;
};

export enum CellState {
  Clear = 'clear',
  Merged = 'merged',
  Score = 'score',
}
