import { useEffect, useState } from 'react';
import { createGrid, newRow } from './grid';
import {
  Cell,
  CellState,
  TetrominoName,
  Player,
  Grid,
  isTetrominoName,
} from './types';
import React from 'react';

export const useGrid = (
  player: Player,
  resetPlayer: () => void
): [Grid, React.Dispatch<React.SetStateAction<Grid>>, number] => {
  const startingGrid: Grid = createGrid();
  const [grid, setGrid] = useState<Grid>(startingGrid);
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newGrid: Grid) =>
      newGrid.reduce((acc: Grid, row: Cell[]) => {
        // check if all cells within a row are filled
        if (row.findIndex(cell => cell[0] !== 0) === -1) {
          setRowsCleared(prev => prev + 1);

          // Add a new row to top
          acc.unshift(newRow());
          return acc;
        }
        // No filled row found, return this row
        acc.push(row);
        return acc;
      }, []);

    const updatedGrid = (prevGrid: Grid) => {
      // First flush the grid,
      // TODO: convert to for loop
      const newGrid: Grid = prevGrid.map((row: Cell[]) =>
        row.map((cell: Cell) =>
          cell[1] === CellState.Clear ? [0, CellState.Clear] : cell
        )
      );

      // Then draw new tetrominos
      player.tetromino.forEach((row: (string | number)[], y: number) => {
        row.forEach((fill: string | number, x: number) => {
          if (fill !== 0 && isTetrominoName(fill)) {
            const cellState = player.collided
              ? CellState.Merged
              : CellState.Clear;
            // check that fill is a type of TetrominoName
            console.log('newGrid', newGrid);
            console.log('y', y);
            console.log('x', x);
            console.log('player.pos.y', player.pos.y);
            console.log('player x', player.pos.x);
            newGrid[y + player.pos.y][x + player.pos.x] = [fill, cellState];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
        return sweepRows(newGrid);
      }

      return newGrid;
    };

    setGrid(prev => updatedGrid(prev));
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ]);

  return [grid, setGrid, rowsCleared];
};
