import React, { useEffect, useState } from 'react';
import Display from './display';
import StartButton from './startButton';
import { usePlayer } from '../../lib/dropchain/usePlayer';
import { useBoard } from '../../lib/dropchain/useBoard';
import { createGrid } from '../../lib/dropchain/grid';
import { useInterval } from '../../lib/dropchain/useInterval';
import { checkCollision } from '../../lib/dropchain/checkCollision';
import { useScore } from '../../lib/dropchain/useScore';
import Board from './board';
import InverseDisplay from './inverseDisplay';

const DropChain = () => {
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [gravity, setGravity] = useState(true);
  const [grid, setGrid, chainsScored] = useBoard(player, resetPlayer, gravity);
  const [score, rows, level, resetScore] = useScore(chainsScored);
  const [dropTime, setDropTime] = useState<number>(null);
  const [gameOver, setGameOver] = useState(null);
  const [titleText, setTitleText] = useState('*  * * DROPCHAIN * * *');

  useEffect(() => {
    if (gameOver) {
      setDropTime(null);
      setTitleText('   GAME OVER * * *');
    } else if (level > 0) {
      setDropTime(floatSpeed(level));
    }
  }, [level, gameOver]);

  const floatSpeed = (level: number): number => Math.max(2000 / level, 200);
  const fallSpeed = (): number => 40;

  const startGame = () => {
    // Reset everything
    setGrid(createGrid());
    setDropTime(floatSpeed(level));
    resetPlayer();
    setGameOver(false);
    resetScore();
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
        setDropTime(fallSpeed());
        dropLink();
        break;
      case 83:
        startGame();
        break;
      case 71:
        setGravity(!gravity);
        break;
      default:
        break;
    }
  };

  const dropLink = () => {
    if (checkCollision(player, grid, { x: 0, y: 1 })) {
      if (player.pos.y < 1) {
        setGameOver(true);
        return;
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
      setDropTime(floatSpeed(level));
    } else {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    }
  };

  useInterval(() => {
    dropLink();
  }, dropTime);

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={e => move(e)}
      id="dropchain"
      className="mx-auto h-screen w-screen overflow-hidden bg-slate-950 p-4 md:p-12"
      // style={{ backgroundImage: `url(${backgroundStars.src})` }}
    >
      <div>
        <InverseDisplay text={titleText} gameOver={gameOver} />

        <div className="mx-auto flex max-w-6xl items-start">
          <Board grid={grid} />
          <aside className="w-full px-10">
            <Display text={`SCORE: ${score}`} />
            <Display text={`ROWS: ${rows}`} />
            <Display text={`LEVEL: ${level}`} />
            <StartButton callback={startGame} />
          </aside>
        </div>

        <Display
          text={`GRAVITY: ${gravity ? 'ON' : 'OFF'} - PRESS [G] TO TOGGLE`}
        />

        <Display
          text={`CHAINS: ${
            dropTime ? 'DROPPING' : 'READY - PRESS [S] TO START'
          }`}
        />
      </div>
    </div>
  );
};

export default DropChain;
