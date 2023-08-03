import { useEffect, useState } from 'react';
import { createStage } from '../../components/tetris/gameHelpers';
import { Cell, Player, Stage } from './types';
import React from 'react';

export const useStage = (
  player: Player,
  resetPlayer: () => void
): [Stage, React.Dispatch<React.SetStateAction<Stage>>] => {
  const startingStage: Stage = createStage();
  const [stage, setStage] = useState<Stage>(startingStage);

  useEffect(() => {
    const updatedStage = (prevStage: Stage) => {
      // First flush the stage, maybe use for loop
      const newStage: Stage = prevStage.map((row: Cell[]) =>
        row.map((cell: Cell) => (cell[1] === 'clear' ? ['X', 'clear'] : cell))
      );

      // Then draw new tetrominos
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 'X') {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value.toString(),
              `${player.collided ? 'merged' : 'clear'}`,
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
