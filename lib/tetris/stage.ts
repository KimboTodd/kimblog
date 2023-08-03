import { Stage } from './types';

export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = (): Stage =>
  Array.from(Array(STAGE_HEIGHT), () =>
    Array(STAGE_WIDTH).fill(['X', 'clear'])
  );
