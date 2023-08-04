import { useEffect, useState } from 'react';
import { createGrid } from './grid';
import { Cell, CellState, Player, Grid } from './types';
import React from 'react';

export const useBoard = (
  player: Player,
  resetPlayer: () => void
): [Grid, React.Dispatch<React.SetStateAction<Grid>>, number] => {
  const initialGrid: Grid = createGrid();
  const [grid, setGrid] = useState<Grid>(initialGrid);
  const [chainsScored, setChainsScored] = useState(0);

  useEffect(() => {
    setChainsScored(0);

    const updatedGrid = (prevGrid: Grid) => {
      // First clear the grid of any cells set to clear (due to movement)
      const newGrid: Grid = [];
      for (let y = 0; y < prevGrid.length; y++) {
        const newRow: Cell[] = [];
        for (let x = 0; x < prevGrid[y].length; x++) {
          const cell = prevGrid[y][x];
          // TODO: probably want to handle clearing scored chains separately
          if (cell[1] === CellState.Clear || cell[1] === CellState.Score) {
            newRow.push([0, CellState.Clear]);
          } else {
            newRow.push(cell);
          }
        }
        newGrid.push(newRow);
      }

      // Then draw new link in position
      if (player.content !== 0) {
        const cellState = player.collided ? CellState.Merged : CellState.Clear;
        newGrid[player.pos.y][player.pos.x] = [player.content, cellState];
      }

      if (player.collided) {
        resetPlayer();
        // handle chain clearing

        // Row by row, handle clearing horizontal chains
        var chainStart = null;
        var chainEnd = null;
        for (let y = 0; y < newGrid.length; y++) {
          const row = newGrid[y];
          for (let x = 0; x < row.length; x++) {
            const fill = row[x][0];

            // a filled cell is found
            if (fill && fill !== 0) {
              chainStart = chainStart === null ? x : chainStart;
              chainEnd = x + 1;
            }

            // an empty cell is found, or we are at the last element in the row
            if (!fill || fill === 0 || x === row.length - 1) {
              if (chainStart === null) {
                // if we have not started a chain, return early
                continue;
              }

              const contiguousLength = chainEnd - chainStart;
              for (let chainI = chainStart; chainI < chainEnd; chainI++) {
                const contiguousElement = row[chainI];
                if (contiguousElement[0] === contiguousLength) {
                  // mark for scoring
                  setChainsScored(prev => prev++);

                  contiguousElement[1] = CellState.Score;
                }
              }

              chainStart = null;
              chainEnd = null;
            }
          }
        }

        // consider transposing and running this funciton again to handle vertical chains
        // function transposeArray<T>(array: T[][]): T[][] {
        //   return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
        // }

        return newGrid;
      }

      return newGrid;
    };

    setGrid(prev => updatedGrid(prev));
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.content,
    resetPlayer,
  ]);

  return [grid, setGrid, chainsScored];
};
