export type Player = {
  pos: Position;
  tetromino: TetrominoShape;
  collided: boolean;
};

export type Position = {
  x: number;
  y: number;
};

export type TetrominoShape = (string | number)[][];

export type Cell = [shape: string, needsClearing: string];

export type Stage = Cell[][];
