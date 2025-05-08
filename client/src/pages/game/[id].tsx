import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from './game.module.css';
import { Cell, initialCells, getAIMove, checkGameState, imagesPath, fetchGame, createNewGame, sendMove } from '../../controls/gameLogic';
import { TTTCell } from '../components/TTTCell';
import Link from 'next/link';
import { sleep } from '..';
import { Player } from '@/models/player.enum';

const mapCells = (cells: string[]) => {
  return cells?.map((cell, idx) => ({ id: idx, clicked: Boolean(cell), img: cell === 'player1' ? imagesPath.player1Img.src : imagesPath.player2Img.src }))
    ?? initialCells;
}
const GamePage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [gameState, setGameState] = useState({} as any);
  const { currentPlayer } = gameState ?? {};
  const [error, setError] = useState<string | null>('');

  const [currPlayer, setCurrPlayer] = useState(currentPlayer);
  const [cells, setCells] = useState<string[]>([]);
  const [winner, setWinner] = useState('')

  useEffect(() => {
    fetchGame(id)
      .then((state) => {
        setError(null);
        setGameState(state);
      })
      .catch(err => {
        setError('Failed to fetch game state. Please try again.');
        console.error(err);
      });
  }, [id]);


  useEffect(() => {
    const { currentPlayer: nextCurrentPlayer, board, status, winner } = gameState;
    setCurrPlayer(nextCurrentPlayer);
    setCells(board);
    if(status === 'win')
      setWinner(winner);
    else if (nextCurrentPlayer === Player.Player2) {
      handleAIMove();
    }
  }, [gameState])

  const handleAIMove = async (): Promise<void> => {
    try {
      const currState = await getAIMove(id, cells);
      await sleep(1000);
      const nextCells = [...cells];
      nextCells[currState.index] = 'player2';
      setCells(nextCells);
      setError(null);
      const nextState = await checkGameState(Player.Player2, id, nextCells);
      setGameState(nextState);
    } catch (err) {
      setError('AI move failed. Please try again.');
      console.error(err);
    }
  }

  const isPlayersTurn = () => {
    return currPlayer == Player.Player1;
  };

  const isCellAvailable = (index: number) => {
    return !Boolean(cells[index]);
  };

  const handleCellClick = async (index: number) => {
    if (!isPlayersTurn() || !isCellAvailable(index)) return false;
    if (winner) return false;
    try {
      const nextCells = [...cells];
      nextCells[index] = 'player1';
      setCells(nextCells);
      await sendMove(index, id, nextCells);
      const nextState = await checkGameState(Player.Player1, id, nextCells);
      setError(null);
      setGameState(nextState);
    } catch (err) {
      setError('Failed to make move. Please try again.');
      console.error(err);
    }
  };

  const handleRestart = async () => {
    try {
      setCells(initialCells.map(() => ''));
      setCurrPlayer(Player.Player1);
      const nextState = await checkGameState(Player.Player2, id, initialCells.map((cell) => null) as any[]);
      setError(null);
      setGameState(nextState);
      setWinner('');
    } catch (err) {
      setError('Failed to restart game. Please try again.');
      console.error(err);
    }
  };

  const handleNewGame = async () => {
    try {
      const newGame = await createNewGame();
      setError(null);
      setWinner('');
      router.push(`/game/${newGame.gameId}`);
    } catch (err) {
      setError('Failed to create new game. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className={`${styles.body} ${styles[currPlayer]}`}>
      <h1>Game #{id}</h1>
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {mapCells(cells).map((cell, index) => (
            <TTTCell key={index} currentPlayer={currPlayer} onClick={() => handleCellClick(index)} data={cell} />
          ))}
        </div>
      </div>
      {!winner && (
        <h2>{currPlayer === Player.Player1 ? 'Your turn' : 'AI is thinking...'}</h2>
      )}
      {winner && (
        <h2>{winner} wins!</h2>
      )}

      <div className={styles.gameControls}>
        <Link href="/" className={styles.button}>
          Home
        </Link>
        <button onClick={handleRestart} className={styles.button}>
          Restart game
        </button>

        <button onClick={handleNewGame} className={styles.button}>
          New game
        </button>
      </div>
    </div>
  );
};

export default GamePage;