import React, { useState } from 'react';
import Stage from './stage';
import Display from './display';
import StartButton from './startButton';
import backgroundStars from '../../public/assets/blog/tetris/backgroundStars.png';
import { usePlayer } from '../../lib/tetris/usePlayer';
import { useStage } from '../../lib/tetris/useStage';
import { createStage } from '../../lib/tetris/stage';
import { checkCollision } from '../../lib/tetris/checkCollision';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const move = ({ keyCode }) => {
    if (gameOver === true) {
      return;
    }

    switch (keyCode) {
      case 37:
        movePlayerLeftRight(-1);
        break;
      case 39:
        movePlayerLeftRight(1);
        break;
      case 40:
        dropPlayer();
        break;
      case 38:
        playerRotate(stage, 1);
        break;
      default:
        break;
    }
  };

  const movePlayerLeftRight = dir => {
    if (checkCollision(player, stage, { x: dir, y: 0 })) {
      return;
    }
    updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const drop = () => {
    // check moving down one step
    if (checkCollision(player, stage, { x: 0, y: 1 })) {
      if (player.pos.y < 1) {
        console.log('Game Over');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    } else {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  console.log('re-render');
  console.log({ stage });
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={e => move(e)}
      id="tetris"
      className="h-screen w-screen overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${backgroundStars.src})` }}
    >
      <div className="mx-auto flex max-w-6xl items-start p-10">
        <Stage stage={stage} />
        <aside className="max-w-200 block w-full px-20">
          {gameOver ? (
            <Display gameOver={true} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" gameOver={false} />
              <Display text="Rows" gameOver={false} />
              <Display text="Level" gameOver={false} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </div>
    </div>
  );
};

export default Tetris;
