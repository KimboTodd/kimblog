import React from 'react';
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import { createStage } from './gameHelpers';
import backgroundStars from '../../public/assets/blog/tetris/backgroundStars.png';

const Tetris = () => {
  return (
    <div
      id="tetris"
      className="h-screen w-screen overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${backgroundStars.src})` }}
    >
      <div className="mx-auto flex max-w-6xl items-start p-10">
        <Stage stage={createStage()} />
        <aside className="max-w-200 block w-full px-20">
          <div>
            <Display text="Score" gameOver={false} />
            <Display text="Rows" gameOver={false} />
            <Display text="Level" gameOver={false} />
          </div>
          <StartButton callback={undefined} />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
