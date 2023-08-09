import { EMPTY, UNBREAKABLE } from '../../components/dropchain/chains';
import { Cell, CellState, Grid } from './types';

export const GRID_WIDTH = 7;
export const GRID_HEIGHT = 8;

export const createGrid = (): Grid =>
  Array.from(Array(GRID_HEIGHT), () => newRow());

/**
 * Note: The cells returned in the new row are the same reference.
 * @returns A new row the width of the grid filled with empty cells.
 */
export const newRow = (): Cell[] =>
  new Array(GRID_WIDTH).fill([EMPTY, CellState.Clear]);

/**
 * Creates a new row of merged cells that are each different objects.
 * @returns {Cell[]} The new row of merged cells.
 */
export const newMergedRow = (): Cell[] =>
  Array.from({ length: GRID_WIDTH }, () => [UNBREAKABLE, CellState.Merged]);
