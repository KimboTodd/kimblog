import { useEffect, useState } from 'react';
import { createStage } from './stage';
import { Cell, CellState, CellValue, Player, Stage } from './types';
import React from 'react';

export const useStage = (
  player: Player,
  resetPlayer: () => void
): [Stage, React.Dispatch<React.SetStateAction<Stage>>] => {
  const startingStage: Stage = createStage();
  const [stage, setStage] = useState<Stage>(startingStage);

  useEffect(() => {
    const updatedStage = (prevStage: Stage) => {
      // First flush the stage,
      // TODO: convert to for loop
      const newStage: Stage = prevStage.map((row: Cell[]) =>
        row.map((cell: Cell) => (cell[1] === CellState.Clear ? ['X', CellState.Clear] : cell))
      );

      // Then draw new tetrominos
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 'X') {
            const cellValue = value as CellValue;
            const cellState = player.collided ? CellState.Merged : CellState.Clear;
            newStage[y + player.pos.y][x + player.pos.x] = [
              cellValue,
              cellState,
            ];
          }
        });
      });

      if (player.collided) {
        resetPlayer();
      }

      return newStage;
    };

    setStage(prev => updatedStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage];
};
