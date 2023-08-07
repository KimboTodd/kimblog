import React, { useEffect, useState } from 'react';
import Display from './display';
import StartButton from './startButton';
import backgroundStars from '../../public/assets/blog/tetris/backgroundStars.png';
import { usePlayer } from '../../lib/dropchain/usePlayer';
import { useBoard } from '../../lib/dropchain/useBoard';
import { createGrid } from '../../lib/dropchain/grid';
import { useInterval } from '../../lib/dropchain/useInterval';
import { checkCollision } from '../../lib/dropchain/checkCollision';
import { useScore } from '../../lib/dropchain/useScore';
import Board from './board';
import Toggle from './toggle';

const DropChain = () => {
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [scoringAnimation, setScoringAnimation] = useState(false);
  const [grid, setGrid, chainsScored] = useBoard(
    player,
    resetPlayer,
    scoringAnimation
  );
  const [score, rows, level, resetScore] = useScore(chainsScored);
  const [dropTime, setDropTime] = useState<number>(null);
  const [gameOver, setGameOver] = useState(false);
  const [gravity, setGravity] = useState(false);

  useEffect(() => {
    // if the level changes, update the drop speed
    if (gameOver) {
      setDropTime(null);
    } else {
      setDropTime(floatSpeed(level));
    }
  }, [level, gameOver]);

  // when chains are scored, pause the game for a moment and set animating  to true for half a second
  useEffect(() => {
    if (chainsScored > 0) {
      console.log('🕕');
      setScoringAnimation(true);
      setTimeout(() => {
        console.log('⏰');
        setScoringAnimation(false);
      }, 2000);
    }
  }, [chainsScored, level]);

  const floatSpeed = (level: number): number => Math.max(2000 / level, 200);
  const fallSpeed = (): number => 40;

  const startGame = () => {
    // Reset everything
    setGrid(createGrid());
    setDropTime(floatSpeed(level));
    resetPlayer();
    setGameOver(false);
    setScoringAnimation(false);
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
      className="h-screen w-screen overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${backgroundStars.src})` }}
    >
      <div className="mx-auto flex max-w-6xl items-start p-10">
        <Board grid={grid} />
        <aside className="max-w-200 block w-full px-20">
          {gameOver && <Display gameOver={gameOver} text="Game Over" />}
          <Display text={`Score: ${score}`} gameOver={gameOver} />
          <Display text={`Rows: ${rows}`} gameOver={gameOver} />
          <Display text={`Level: ${level}`} gameOver={gameOver} />
          <StartButton callback={startGame} />
          <Toggle label="Gravity" checked={gravity} setChecked={setGravity} />
        </aside>
      </div>
    </div>
  );
};

export default DropChain;
