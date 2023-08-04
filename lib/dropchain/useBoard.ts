import { useEffect, useState } from 'react';
import { createGrid, newRow } from './grid';
import { Cell, CellState, Player, Grid } from './types';
import React from 'react';

export const useBoard = (
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
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev++);

          // Add a new row to top
          acc.unshift(newRow());
          return acc;
        }
        // No filled row found, return this row
        acc.push(row);
        return acc;
      }, []);

    const updatedGrid = (prevGrid: Grid) => {
      // First clear the grid of any cells set to clear
      const newGrid: Grid = [];
      for (let y = 0; y < prevGrid.length; y++) {
        const newRow: Cell[] = [];
        for (let x = 0; x < prevGrid[y].length; x++) {
          const cell = prevGrid[y][x];
          if (cell[1] === CellState.Clear) {
            newRow.push([0, CellState.Clear]);
          } else {
            newRow.push(cell);
          }
        }
        newGrid.push(newRow);
      }

      // Then draw new tetrominos
      player.tetromino.forEach((row: (string | number)[], y: number) => {
        row.forEach((fill: string | number, x: number) => {
          if (fill !== 0) {
            const cellState = player.collided
              ? CellState.Merged
              : CellState.Clear;
            newGrid[y + player.pos.y][x + player.pos.x] = [
              fill as number,
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
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetromino,
    resetPlayer,
  ]);

  return [grid, setGrid, rowsCleared];
};
