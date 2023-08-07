import { useEffect, useState } from 'react';
import { createGrid } from './grid';
import { Cell, CellState, Player, Grid } from './types';
import React from 'react';

export const useBoard = (
  player: Player,
  resetPlayer: () => void,
  gravity
): [Grid, React.Dispatch<React.SetStateAction<Grid>>, number] => {
  const initialGrid: Grid = createGrid();
  const [grid, setGrid] = useState<Grid>(initialGrid);
  const [chainsScored, setChainsScored] = useState(0);

  useEffect(() => {
    setChainsScored(0);

    const updatedGrid = (prevGrid: Grid) => {
      // Note: clearing the board each game loop is what gives the illusion of animation
      let newGrid: Grid = clearBoard(prevGrid);

      if (gravity) {
        newGrid = gravitizeGrid(newGrid);
      }

      // Draw new active player link in position
      if (player.content !== 0) {
        const cellState = player.collided ? CellState.Merged : CellState.Clear;
        newGrid[player.pos.y][player.pos.x] = [player.content, cellState];
      }

      // Only if the player has collided, check for chains and scoring
      if (player.collided) {
        const chainsFormed: number = markScoringChains(newGrid);
        if (chainsFormed > 0) {
          setChainsScored(prev => {
            return prev + 1;
          });
        }

        // TODO: fix chaining
        // check for chains again
        // if chains, repeat

        resetPlayer();
      }

      return newGrid;
    };

    // TODO: revisit this idea for chained busting
    setGrid(prev => updatedGrid(prev));
  }, [gravity, player, resetPlayer]);

  return [grid, setGrid, chainsScored];
};

/**
 * Shifts any non-null/non-zero cells down, like gravity is turned on.
 * @param newGrid The current game grid.
 * @returns The updated game grid with cells shifted down.
 */
function gravitizeGrid(grid: Grid): Grid {
  const newGrid: Grid = createGrid();

  // loop through each column
  for (let x = 0; x < grid[0].length; x++) {
    let filledPointer = grid.length - 1;
    for (let y = grid.length - 1; y > 0; y--) {
      if (grid[y][x][0] !== 0) {
        newGrid[filledPointer][x] = grid[y][x];
        filledPointer--;
      }
    }
  }
  return newGrid;
}

/**
 * Marks scoring chains in the game grid and returns the number of chains scored.
 * @param newGrid The current game grid.
 * @returns The number of chains scored.
 */
function markScoringChains(newGrid: Grid): number {
  // Row by row, handle clearing horizontal chains
  let rowChainStart = null;
  let rowChainEnd = null;
  let chainsScored = 0;
  for (let y = 0; y < newGrid.length; y++) {
    const row = newGrid[y];
    for (let x = 0; x < row.length; x++) {
      const fill = row[x][0];

      // a filled cell is found
      if (fill && fill !== 0) {
        rowChainStart = rowChainStart === null ? x : rowChainStart;
        rowChainEnd = x + 1;
      }

      // an empty cell is found, or we are at the last element in the row
      if (!fill || fill === 0 || x === row.length - 1) {
        if (rowChainStart === null) {
          // if we have not started a chain, return early
          continue;
        }

        const contiguousLength = rowChainEnd - rowChainStart;
        for (let chainI = rowChainStart; chainI < rowChainEnd; chainI++) {
          if (row[chainI][0] === contiguousLength) {
            // mark for scoring
            chainsScored++;
            row[chainI] = [row[chainI][0], CellState.Score];
          }
        }

        rowChainStart = null;
        rowChainEnd = null;
      }
    }
  }

  var colChainStart = null;
  var colChainEnd = null;
  const colPlayableHeight = newGrid.length;
  // Clear column by column, handle clearing vertical chains
  for (let x = 0; x < newGrid[0].length; x++) {
    for (let y = 0; y < colPlayableHeight; y++) {
      const fill = newGrid[y][x][0];

      // a filled cell is found
      if (fill && fill !== 0) {
        colChainStart = colChainStart === null ? y : colChainStart;
        colChainEnd = y + 1;
      }

      // an empty cell is found, or we are at the last element in the row
      if (!fill || fill === 0 || y === colPlayableHeight - 1) {
        if (colChainStart === null) {
          // if we have not started a chain, return early
          continue;
        }

        const contiguousLength = colChainEnd - colChainStart;
        for (let chainI = colChainStart; chainI < colChainEnd; chainI++) {
          if (newGrid[chainI][x][0] === contiguousLength) {
            // mark for scoring
            chainsScored++;
            newGrid[chainI][x] = [newGrid[chainI][x][0], CellState.Score];
          }
        }

        colChainStart = null;
        colChainEnd = null;
      }
    }
  }

  return chainsScored;
}

/**
 * Clears the game board by replacing all cells that are CellState.Clear or CellState.Score with empty cells.
 * @param prevGrid The previous game grid.
 * @returns The updated game grid with all cells that are CellState.Clear or CellState.Score replaced with empty cells.
 */
function clearBoard(prevGrid: Grid): Grid {
  const newGrid: Grid = [];
  for (let y = 0; y < prevGrid.length; y++) {
    const newRow: Cell[] = [];
    for (let x = 0; x < prevGrid[y].length; x++) {
      const cell = prevGrid[y][x];
      if (cell[1] === CellState.Clear || cell[1] === CellState.Score) {
        newRow.push([0, CellState.Clear]);
      } else {
        newRow.push(cell);
      }
    }
    newGrid.push(newRow);
  }
  return newGrid;
}
