import { useEffect, useState } from 'react';
import { createGrid } from './grid';
import { Cell, CellState, Player, Grid } from './types';
import React from 'react';

export const useBoard = (
  player: Player,
  resetPlayer: () => void,
  scoringAnimation: boolean
): [Grid, React.Dispatch<React.SetStateAction<Grid>>, number] => {
  const initialGrid: Grid = createGrid();
  const [grid, setGrid] = useState<Grid>(initialGrid);
  const [chainsScored, setChainsScored] = useState(0);

  useEffect(() => {
    setChainsScored(0);

    const updatedGrid = (prevGrid: Grid) => {
      const newGrid: Grid = [];
      console.log('🥪 useboard');
      console.log('🥪 useBoard: removing clear or score from grid"');
      console.log('🥪 player collided', player.collided);
      // 1. Clear the grid of any cells set to clear or score
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

      // 2. Draw new link in position
      if (player.content !== 0) {
        const cellState = player.collided ? CellState.Merged : CellState.Clear;
        newGrid[player.pos.y][player.pos.x] = [player.content, cellState];
      }

      // 3. If gravity is on, shift any non-null cells down
      // TODO:

      // 4. If the player has collided, check for chains and scoring
      if (player.collided) {
        // resetPlayer(); 

        // handle chain clearing

        // Row by row, handle clearing horizontal chains
        var rowChainStart = null;
        var rowChainEnd = null;
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
                const contiguousElement = row[chainI];
                if (contiguousElement[0] === contiguousLength) {
                  // mark for scoring
                  console.log('🥪 useBoard: Marking for scoring');
                  setChainsScored(prev => {
                    console.log('🥪 useBoard: Setting chains scored');
                    return prev + 1;
                  });

                  contiguousElement[1] = CellState.Score;
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
                const contiguousElement = newGrid[chainI][x];
                if (contiguousElement[0] === contiguousLength) {
                  // mark for scoring
                  console.log('🥪 useBoard: Marking for scoring');
                  setChainsScored(prev => {
                    console.log('🥪 useBoard: Setting chains scored');
                    return prev + 1;
                  });
                  contiguousElement[1] = CellState.Score;
                }
              }

              colChainStart = null;
              colChainEnd = null;
            }
          }
        }

        // 5. If we have scored, animate the scoring
        // by pausing this function
        console.log('end collided section 🥪');
        return newGrid;
      }

      console.log('🥪');

      return newGrid;
    };

    if (scoringAnimation === false) {
      setGrid(prev => updatedGrid(prev));
    } else {
      console.log(
        `🥪 Skipping seBoard: scoring animation: ${scoringAnimation} 🥪 `
      );
    }
  }, [
    // player.collided,
    // player.pos.x,
    // player.pos.y,
    // player.content,
    player,
    // resetPlayer,
    scoringAnimation,
    // chainsScored,
  ]);

  return [grid, setGrid, chainsScored];
};

// if we scored
// calculate new score ✅
// pause drop time?
// don't create next chain until we have finished scoring
// animate scoring
// rerun above loop to clear and check for new chains
// but what about collisions?
