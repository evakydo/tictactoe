import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../HomePage.module.css';
import { initialCells, imagesPath } from '../../controls/gameLogic';
import { TTTCell } from '../components/TTTCell';
import Link from 'next/link';

const mapCells = (cells: string[]) => {
  return cells?.map((cell, idx) => ({ id: idx, clicked: Boolean(cell), img: cell === 'player1' ? imagesPath.player1Img.src : imagesPath.player2Img.src }))
    ?? initialCells;
}
const GamePage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [gameState, setGameState] = useState({} as any);
  const { currentPlayer, ongoingGame } = gameState ?? {};

  const [currPlayer, setCurrPlayer] = useState(currentPlayer);
  const [cells, setCells] = useState<string[]>([]);
  const [winner, setWinner] = useState('')
  
  const handleCellClick = async (index: number) => {
  };

  const handleRestart = async () => {
  };

  const handleNewGame = async () => {
  };

  return (
    <div className={`${styles.body} ${styles[currPlayer]}`}>
      <h1>Game #{id}</h1>
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {mapCells(cells).map((cell, index) => (
            <TTTCell key={index} currentPlayer={currPlayer} onClick={() => handleCellClick(index)} data={cell} />
          ))}
        </div>
      </div>
      {!winner || winner === 'none' && (
        <h2>Current turn: {currPlayer}</h2>
      )}
      {winner && winner !== 'none' && (
        <h2>{winner} wins!</h2>
      )}

      <div className={styles.gameControls}>
        <button onClick={handleRestart} className={styles.button}>
          Restart Game
        </button>
        <Link href="/" className={styles.button}>
          Go Home
        </Link>
        <button onClick={handleNewGame} className={styles.button}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default GamePage;