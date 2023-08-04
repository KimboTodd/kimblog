import React, { useState } from 'react';
import Display from './display';
import StartButton from './startButton';
import backgroundStars from '../../public/assets/blog/tetris/backgroundStars.png';
import { usePlayer } from '../../lib/dropchain/usePlayer';
import { useBoard } from '../../lib/dropchain/useBoard';
import { createGrid } from '../../lib/dropchain/grid';
import { useInterval } from '../../lib/dropchain/useInterval';
import { checkCollision } from '../../lib/dropchain/checkCollision';
import { useGameStatus } from '../../lib/dropchain/useGameStatus';
import Board from './board';

const DropChain = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [grid, setGrid, chainsCleared] = useBoard(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(chainsCleared);
  
  const floatDownSpeed = (level: number): number => {
    const minSpeed = 100;
    const maxSpeed = 2000;
    const speedRange = maxSpeed - minSpeed;
    const speed = maxSpeed - speedRange * level;
    return Math.max(speed, minSpeed);
  };

  const fastDropSpeed = (level: number): number => {
    var floatDown = floatDownSpeed(level);
    const minSpeed = 5;
    return Math.max(minSpeed, floatDown / 20);
  };

  const startGame = () => {
    // Reset everything
    setGrid(createGrid());
    setDropTime(floatDownSpeed(level));
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
        if (checkCollision(player, grid, { x: -1, y: 0 }) === false) {
          updatePlayerPos({ x: -1, y: 0, collided: false });
        }
        break;
      case 39:
        if (checkCollision(player, grid, { x: 1, y: 0 }) === false) {
          updatePlayerPos({ x: 1, y: 0, collided: false });
        }
        break;
      case 40:
        setDropTime(fastDropSpeed(level));
        dropLink();
        break;
      default:
        break;
    }
  };

  const dropLink = () => {
    if (rows >= (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(floatDownSpeed(level));
    }

    // check collisions from moving down one step
    if (checkCollision(player, grid, { x: 0, y: 1 })) {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      var res = floatDownSpeed(level);
      setDropTime(res);
    } else {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    }
  };

  useInterval(() => {
    // TODO: can we move this to only check when a level is cleared?
    // increase level when player has cleared 10 rows
    dropLink();
  }, dropTime);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={e => move(e)}
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
