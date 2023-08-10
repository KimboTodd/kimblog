import { useEffect, useState } from 'react';
import { createGrid, newMergedRow } from './grid';
import { Cell, CellState, Player, Grid, Position } from './types';
import React from 'react';
import {
  EMPTY,
  UNBREAKABLE,
  randomLink,
} from '../../components/dropchain/links';

export const useBoard = (
  player: Player,
  updatePlayerPos: (args: {
    x: number;
    y: number;
    collided: boolean;
    content?: number;
  }) => void,
  resetPlayer: () => void,
  gravity: boolean,
  links: number,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
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
      if (player.content !== EMPTY) {
        const cellState = player.collided ? CellState.Merged : CellState.Clear;
        newGrid[player.pos.y][player.pos.x] = [player.content, cellState];
      }

      // Only if the player has collided, check for chains and scoring
      if (player.collided) {
        const chainsFormed: number = markScoringChains(newGrid);
        if (chainsFormed > 0) {
          setChainsScored(prev => prev + 1);

          // if there were chains, reset the player position but not collided
          updatePlayerPos({ x: 3, y: 0, collided: true, content: EMPTY });
        } else {
          // if there were no chains formed, reset the player position and collided
          resetPlayer();
        }
      }

      return newGrid;
    };

    // TODO: revisit this idea for chained busting
    setGrid(prev => updatedGrid(prev));
  }, [gravity, player, resetPlayer, updatePlayerPos]);

  // TODO: make sure this scores any chains that are formed
  // every 7 drops, add a new row to the bottom
  // and push everything up one row
  useEffect(() => {
    if (links !== 0 && links % 7 === 0) {
      setGrid(prev => {
        const newGrid: Grid = prev.filter((row: Cell[], i: number) => {
          // if the first row of the board has contents, game over
          if (i === 1 && row.some((cell: Cell) => cell[0] !== 0)) {
            setGameOver(true);
            return prev;
          }
          // if this is the first row of the grid, disregard (remove)
          if (i !== 1) {
            return row.map((cell: Cell) => cell);
          }
        });

        // add a new row at the end
        const row: Cell[] = newMergedRow();
        newGrid[prev.length - 1] = row;

        // after adding the new row check if this created any chains for scoring
        const chainsFormed: number = markScoringChains(newGrid);
        if (chainsFormed > 0) {
          setChainsScored(prev => prev + 1);
        }
        return newGrid;
      });
    }
  }, [links, setGameOver, setGrid]);

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
  const scoredCoordinates: Position[] = [];

  // Find contiguous cells in rows
  for (let y = 0; y < newGrid.length; y++) {
    let rowChainStart = null;
    let rowChainEnd = null;

    for (let x = 0; x < newGrid[y].length; x++) {
      // a filled cell is found
      if (newGrid[y][x][0] !== EMPTY) {
        if (rowChainStart === null) {
          rowChainStart = x;
        }
        rowChainEnd = x + 1;
      }

      // an empty cell is found, or we are at the last element in the row
      if (newGrid[y][x][0] === EMPTY || x === newGrid[y].length - 1) {
        if (rowChainStart === null) {
          // if we have not started a chain, return early
          continue;
        }

        // If we have a chain, mark it for scoring
        const contiguousLength = rowChainEnd - rowChainStart;
        for (let chainI = rowChainStart; chainI < rowChainEnd; chainI++) {
          if (newGrid[y][chainI][0] === contiguousLength) {
            scoredCoordinates.push({ x: chainI, y });
          }
        }

        rowChainStart = null;
        rowChainEnd = null;
      }
    }
  }

  // Find contiguous cells in columns
  for (let x = 0; x < newGrid[0].length; x++) {
    let colChainStart: number | null = null;
    let colChainEnd: number | null = null;

    for (let y = 0; y < newGrid.length; y++) {
      // a filled cell is found
      if (newGrid[y][x][0] !== EMPTY) {
        if (colChainStart === null) {
          colChainStart = y;
        }
        colChainEnd = y + 1;
      }

      // an empty cell is found, or we are at the last element in the col
      if (newGrid[y][x][0] === EMPTY || y === newGrid.length - 1) {
        if (colChainStart === null) {
          // if we have not started a chain, return early
          continue;
        }

        // If we have a chain, mark it for scoring
        const contiguousLength = colChainEnd - colChainStart;
        for (let chainI = colChainStart; chainI < colChainEnd; chainI++) {
          if (newGrid[chainI][x][0] === contiguousLength) {
            scoredCoordinates.push({ x, y: chainI });
          }
        }

        colChainStart = null;
        colChainEnd = null;
      }
    }
  }

  scoredCoordinates.forEach(({ x, y }: Position) => {
    // Mark each set coordinate as scored
    newGrid[y][x][1] = CellState.Score;

    // Convert neighboring unbreakable links to breakable links
    const left = x - 1;
    if (left >= 0 && newGrid[y][left][0] === UNBREAKABLE) {
      newGrid[y][left][0] = randomLink().content;
    }
    const right = x + 1;
    if (right < newGrid[y].length && newGrid[y][right][0] === UNBREAKABLE) {
      newGrid[y][right][0] = randomLink().content;
    }
    const above = y - 1;
    if (above > 0 && newGrid[above][x][0] === UNBREAKABLE) {
      newGrid[above][x][0] = randomLink().content;
    }
    const below = y + 1;
    if (below < newGrid.length && newGrid[below][x][0] === UNBREAKABLE) {
      newGrid[below][x][0] = randomLink().content;
    }
  });

  return scoredCoordinates.length;
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
    for (let x = 0; x < prevGrid[0].length; x++) {
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
