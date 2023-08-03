import { useEffect, useState } from 'react';
import { createGrid, newRow } from './grid';
import { Cell, CellState, TetrominoName, Player, Grid } from './types';
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

    const sweepRows = newGrid =>
      newGrid.reduce((acc, row) => {
        // check if all cells within a row are filled
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev++);

          // Add a new row to top
          acc.unshift(newRow);
          return acc;
        }
        // No filled row found, return this row
        acc.push(row);
      }, []);

    const updatedGrid = (prevGrid: Grid) => {
      // First flush the grid,
      // TODO: convert to for loop
      const newGrid: Grid = prevGrid.map((row: Cell[]) =>
        row.map((cell: Cell) =>
          cell[1] === CellState.Clear ? ['X', CellState.Clear] : cell
        )
      );

      // Then draw new tetrominos
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 'X') {
            const cellValue = value as TetrominoName;
            const cellState = player.collided
              ? CellState.Merged
              : CellState.Clear;
            newGrid[y + player.pos.y][x + player.pos.x] = [
              cellValue,
              cellState,
            ];
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
  }, [player, resetPlayer]);

  return [grid, setGrid, rowsCleared];
};
