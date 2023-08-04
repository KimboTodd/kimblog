import { Cell, CellState, Grid } from './types';

export const GRID_WIDTH = 7;
export const GRID_HEIGHT = 8;

export const createGrid = (): Grid =>
  Array.from(Array(GRID_HEIGHT), () => newRow());

export const newRow = (): Cell[] =>
  new Array(GRID_WIDTH).fill([0, CellState.Clear]);
