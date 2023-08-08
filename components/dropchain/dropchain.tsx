import React, { useCallback, useEffect, useState } from 'react';
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

const DropChain = () => {
  const [score, setScore] = useState<number>(0);
  const [links, setLinks] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [gameOver, setGameOver] = useState(null);
  const [dropTime, setDropTime] = useState<number>(null);
  const [titleText, setTitleText] = useState('*  * * DROPCHAIN * * *');
  const [scoreSound, setScoreSound] = useState(null);
  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [gravity, setGravity] = useState(true);
  const [grid, setGrid, chainsScored] = useBoard(
    player,
    resetPlayer,
    gravity,
    links,
    setGameOver
  );

  const resetScore = useCallback(() => {
    setScore(0);
    setLinks(0);
    setLevel(1);
  }, []);

  useEffect(() => {
    setLinks(prev => prev + 1);
  }, [player.content]);

  useEffect(() => {
    if (chainsScored > 0) {
      if (links >= level * 7) {
        setLevel(prev => prev + 1);
      }

      const linePoints: number[] = [
        10, 20, 30, 50, 80, 130, 210, 340, 550, 890,
      ];
      setScore(prev => prev + linePoints[chainsScored - 1] * level);
    }
  }, [chainsScored, level, links]);

  useEffect(() => {
    if (gameOver) {
      setDropTime(null);
      setTitleText('* * * * * * GAME OVER');
      new Audio('/assets/blog/dropchain/score-waw.wav').play();
    } else if (level > 0) {
      setDropTime(floatSpeed(level));
    }
  }, [level, gameOver]);

  useEffect(() => {
    if (chainsScored > 0) {
      const sound = new Audio(
        '/assets/blog/dropchain/audio/confirmation_001.ogg'
      );
      sound.play();
      setScoreSound(sound);
    }
  }, [chainsScored]);

  useEffect(() => {
    if (scoreSound) {
      scoreSound.addEventListener('ended', () => {
        scoreSound.remove();
        setScoreSound(null);
      });
    }
  }, [scoreSound]);

  const floatSpeed = (level: number): number => Math.max(2000 / level, 200);
  const fallSpeed = (): number => 40;

  const startGame = () => {
    // Reset everything
    setGrid(createGrid());
    setDropTime(floatSpeed(level));
    resetPlayer();
    setGameOver(false);
    resetScore();
    setTitleText('* * * DROPCHAIN * * *');
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
      new Audio('/assets/blog/dropchain/audio/glass_006.ogg').play();

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
    new Audio('/assets/blog/dropchain/audio/glass_002.ogg').play();
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
      <div className="mx-auto max-w-6xl">
        <InverseDisplay text={titleText} gameOver={gameOver} />

        <div className="mx-auto flex justify-between">
          <Board grid={grid} />
          <aside className="flex w-full flex-col justify-between  px-10">
            <Display text={`SCORE: ${score}`} flash={true} />
            <Display text={`LEVEL: ${level}`} flash={true} />
            <RowCounter links={links} />

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
                dropTime ? `SENDING ${links}` : 'READY - PRESS [S] TO START'
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
