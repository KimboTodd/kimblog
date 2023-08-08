import React, { useEffect, useState } from 'react';
import Display from './display';
import StartButton from './startButton';
import { usePlayer } from '../../lib/dropchain/usePlayer';
import { useBoard } from '../../lib/dropchain/useBoard';
import { createGrid } from '../../lib/dropchain/grid';
import { useInterval } from '../../lib/dropchain/useInterval';
import { checkCollision } from '../../lib/dropchain/checkCollision';
import Board from './board';
import InverseDisplay from './inverseDisplay';
import RowCounter from './rowCounter';
import { useScore } from '../../lib/dropchain/useScore';

const DropChain = () => {
  const [linksDropped, setLinksDropped] = useState<number>(0);
  const [gameOver, setGameOver] = useState(null);
  const [dropTime, setDropTime] = useState<number>(null);
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [gravity, setGravity] = useState(true);
  const [grid, setGrid, chainsScored] = useBoard(
    player,
    resetPlayer,
    gravity,
    linksDropped,
    setGameOver
  );
  const [score, level, resetScore] = useScore(chainsScored, linksDropped);

  useEffect(() => {
    setLinksDropped(prev => prev + 1);
  }, [player.content]);

  useEffect(() => {
    if (gameOver) {
      setDropTime(null);
      new Audio('/assets/blog/dropchain/score-waw.wav').play();
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
    setLinksDropped(0);
  };

  const move = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        if (gameOver !== true) {
          if (checkCollision(player, grid, { x: -1, y: 0 }) === false) {
            updatePlayerPos({ x: -1, y: 0, collided: false });
          }
        }
        break;
      case 39:
        if (gameOver !== true) {
          if (checkCollision(player, grid, { x: 1, y: 0 }) === false) {
            updatePlayerPos({ x: 1, y: 0, collided: false });
          }
        }
        break;
      case 40:
        if (gameOver !== true) {
          setDropTime(fallSpeed());
          dropLink();
        }
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
      new Audio('/assets/blog/dropchain/glass_006.ogg').play();

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
    new Audio('/assets/blog/dropchain/glass_002.ogg').play();
    dropLink();
  }, dropTime);

  return (
    <div
      role="button"
      autoFocus
      tabIndex={0}
      onKeyDown={e => move(e)}
      id="dropchain"
      className="h-screen w-screen overflow-hidden bg-slate-950 p-4 md:p-12"
    >
      <div className="visible md:hidden">
        <Display
          text={`This game isn't ready for mobile play just yet. Instead, check it out with a keyboard and a larger screen.`}
          flash={false}
        />
      </div>

      <div className="invisible mx-auto max-w-7xl md:visible">
        <InverseDisplay
          text={gameOver ? 'GAME OVER' : '*  * * DROPCHAIN * * *'}
          gameOver={gameOver}
        />

        <div className="mx-auto flex flex-col justify-between md:flex-row">
          <Board grid={grid} />
          <aside className="flex w-full flex-col justify-between px-4 lg:px-10 ">
            <Display text={`SCORE: ${score}`} flash={true} />
            <Display text={`LEVEL: ${level}`} flash={true} />
            <RowCounter links={linksDropped} />

            <Display
              flash={false}
              text={`TO SCORE: FORM A CHAIN OF LINKS THE SAME LENGTH AS THE NUMBER THAT APPEARS ON A LINK.`}
            />

            <Display
              flash={false}
              text={`GRAVITY: ${gravity ? 'ON' : 'OFF'} - PRESS [G] TO TOGGLE`}
            />

            <Display
              flash={false}
              text={`LINKS: ${
                dropTime
                  ? `SENDING ${linksDropped}`
                  : 'READY - PRESS [S] TO START'
              }`}
            />

            <StartButton callback={startGame} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DropChain;
