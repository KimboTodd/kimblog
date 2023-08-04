import React, { useState } from 'react';
import Display from './display';
import StartButton from './startButton';
import backgroundStars from '../../public/assets/blog/tetris/backgroundStars.png';
import { usePlayer } from '../../lib/dropchain/usePlayer';
import { useGrid } from '../../lib/dropchain/useGrid';
import { createGrid } from '../../lib/dropchain/grid';
import { useInterval } from '../../lib/dropchain/useInterval';
import { checkCollision } from '../../lib/dropchain/checkCollision';
import { useGameStatus } from '../../lib/dropchain/useGameStatus';
import Board from './board';

const DropChain = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [grid, setGrid, rowsCleared] = useGrid(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);
  const dropSpeedFunction = () => 1000 / (level + 1) + 200;

  const startGame = () => {
    // Reset everything
    setGrid(createGrid());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
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
        playerRotate(grid, 1);
        break;
      default:
        break;
    }
  };

  const keyUp = (e: React.KeyboardEvent) => {
    if (gameOver === false && e.code === 'ArrowDown') {
      setDropTime(dropSpeedFunction());
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const movePlayerLeftRight = dir => {
    if (checkCollision(player, grid, { x: dir, y: 0 })) {
      return;
    }
    updatePlayerPos({ x: dir, y: 0, collided: false });
  };

  const drop = () => {
    // increase level when player has cleared 10 rows
    if (rows >= (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(dropSpeedFunction());
    }

    // check collisions from moving down one step
    if (checkCollision(player, grid, { x: 0, y: 1 })) {
      if (player.pos.y < 1) {
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

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={e => move(e)}
      onKeyUp={e => keyUp(e)}
      id="dropchain"
      className="h-screen w-screen overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${backgroundStars.src})` }}
    >
      <div className="mx-auto flex max-w-6xl items-start p-10">
        <Board grid={grid} />
        <aside className="max-w-200 block w-full px-20">
          {gameOver && <Display gameOver={gameOver} text="Game Over" />}
          <div>
            <Display text={`Score: ${score}`} gameOver={gameOver} />
            <Display text={`Rows: ${rows}`} gameOver={gameOver} />
            <Display text={`Level: ${level}`} gameOver={gameOver} />
          </div>
          <StartButton callback={startGame} />
        </aside>
      </div>
    </div>
  );
};

export default DropChain;
