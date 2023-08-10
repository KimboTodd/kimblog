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
import InstructionsModal from './instructionsModal';
import { EMPTY } from './links';

const DropChain = () => {
  const [linksDropped, setLinksDropped] = useState<number>(0);
  const [gameOver, setGameOver] = useState(null);
  const [gameOn, setGameOn] = useState(false);
  const [dropTime, setDropTime] = useState<number>(null);
  const [player, updatePlayerPos, resetPlayer, resetPlayerForScoring] =
    usePlayer();
  const [gravity, setGravity] = useState(true);
  const [grid, setGrid, linksBroken] = useBoard(
    player,
    resetPlayerForScoring,
    resetPlayer,
    gravity,
    linksDropped,
    setGameOver,
    setGameOn
  );
  const [score, level, resetScore] = useScore(linksBroken, linksDropped);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (player.content !== EMPTY) {
      setLinksDropped(prev => prev + 1);
    }
  }, [player.content]);

  // Manage the game speed
  useEffect(() => {
    if (gameOver || gameOn === false) {
      setDropTime(null);
      new Audio('/assets/blog/dropchain/error_003.ogg').play();
    } else if (gameOn) {
      setDropTime(floatSpeed(level));
    }
  }, [gameOn, gameOver, level]);

  const fallSpeed = (): number => 40;
  const floatSpeed = (level: number): number =>
    Math.max(500, 2000 - level * 20);

  const startGame = () => {
    // Reset everything
    setGrid(createGrid());
    setDropTime(floatSpeed(level));
    resetPlayer();
    setGameOver(false);
    setGameOn(true);
    resetScore();
    setLinksDropped(0);
  };

  const move = ({ keyCode }) => {
    switch (keyCode) {
      case 37: // Left arrow
        if (gameOn) {
          if (checkCollision(player, grid, { x: -1, y: 0 }) === false) {
            updatePlayerPos({ x: -1, y: 0, collided: false });
          }
        }
        break;
      case 39: // Right arrow
        if (gameOn) {
          if (checkCollision(player, grid, { x: 1, y: 0 }) === false) {
            updatePlayerPos({ x: 1, y: 0, collided: false });
          }
        }
        break;
      case 40: // Down arrow
        if (gameOn) {
          setDropTime(fallSpeed());
          dropLink();
        }
        break;
      case 83: // S key
        startGame();
        break;
      case 71: // G key
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
        setGameOn(false);
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
      className="h-screen w-screen overflow-hidden bg-slate-900 p-4 md:p-12"
    >
      <InstructionsModal open={modalOpen} setOpen={setModalOpen} />
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
              text={`GRAVITY: ${gravity ? 'ON' : 'OFF'} - PRESS [G] TO TOGGLE`}
            />

            <Display
              flash={false}
              text={`${
                dropTime
                  ? `LINK: ${linksDropped}`
                  : 'LINKS: READY - PRESS [S] TO START'
              }`}
            />

            <button
              className="box-border w-full animate-crtBlurText cursor-pointer border-4 border-double border-green-600 p-4 font-mono text-green-500 sm:text-xl lg:text-2xl"
              onClick={() => setModalOpen(true)}
            >
              View Instructions
            </button>

            <StartButton callback={startGame} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DropChain;
