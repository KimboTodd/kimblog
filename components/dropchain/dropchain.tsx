import React, { useEffect, useRef, useState } from 'react';
import Display from './display';
import StartButton from './startButton';
import { usePlayer } from '../../lib/dropchain/usePlayer';
import { useBoard } from '../../lib/dropchain/useBoard';
import { createGrid } from '../../lib/dropchain/grid';
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
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [grid, setGrid, linksBroken] = useBoard(
    player,
    resetPlayer,
    linksDropped,
    setGameOver,
    setGameOn
  );
  const [score, level, resetScore] = useScore(linksBroken, linksDropped);
  const [modalOpen, setModalOpen] = useState(false);
  const playerRef = useRef(player);

  useEffect(() => {
    if (player.content !== EMPTY) {
      setLinksDropped(prev => prev + 1);
    }
  }, [player.content]);

  // Manage the game speed
  useEffect(() => {
    if (gameOver || gameOn === false) {
      new Audio('/assets/blog/dropchain/error_003.ogg').play();
    }
  }, [gameOn, gameOver, level, linksBroken]);

  const startGame = () => {
    // Reset everything
    setGrid(createGrid());
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
          dropLink();
        }
        break;
      case 83: // S key
        startGame();
        break;
      default:
        break;
    }
  };

  const dropLink = () => {
    const dropPlayer = () => {
      // TODO Consider doing this instead of setting a player ref
      // setGrid(prev => scoreGrid(prev));
      if (checkCollision(playerRef.current, grid, { x: 0, y: 1 })) {
        // Current link is unable to move down without colliding
        if (playerRef.current.pos.y < 1) {
          setGameOver(true);
          setGameOn(false);
          return true;
        }

        new Audio('/assets/blog/dropchain/glass_006.ogg').play();
        updatePlayerPos({ x: 0, y: 0, collided: true });
        return true;
      } else {
        new Audio('/assets/blog/dropchain/glass_002.ogg').play();
        updatePlayerPos({ x: 0, y: 1, collided: false });
        return false;
      }
    };

    const timerId = setInterval(() => {
      const collided = dropPlayer();
      if (collided) {
        clearInterval(timerId);
      }
    }, 70);
  };

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

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
        <div className="mx-auto flex flex-col justify-between md:flex-row">
          <Board grid={grid} />
          
          <aside className="flex w-full flex-col justify-between px-4 lg:px-10">
            <InverseDisplay
              text={
                gameOver
                  ? 'DROPCHAIN --------- GAME OVER --------- '
                  : 'DROPCHAIN'
              }
              gameOver={gameOver}
            />

            <RowCounter links={linksDropped} />

            <button
              className="box-border w-full cursor-pointer border-4 border-double border-green-600 p-4 font-mono text-green-500 sm:text-xl lg:text-2xl"
              onClick={() => setModalOpen(true)}
            >
              View Instructions
            </button>

            <Display text={`SCORE: ${score}`} flash={true} />
            <Display text={`LEVEL: ${level}`} flash={true} />

            <Display
              flash={false}
              text={`${
                gameOn
                  ? `LINK: ${linksDropped}`
                  : 'LINKS: READY - PRESS [S] TO START'
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
