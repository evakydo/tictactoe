import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '../HomePage.module.css';
import { Cell, initialCells, getAIMove, checkGameState, Player, imagesPath, fetchGame, newGameAI, sendMove } from '../../controls/gameLogic';
import { TTTCell } from '../components/TTTCell';
import Link from 'next/link';
import { sleep } from '..';

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

  useEffect(() => {
    fetchGame(id).
      then((state) => setGameState(state))
      .catch(err => console.log(err))
  }, [id]);


  useEffect(() => {
    const { currentPlayer: nextCurrentPlayer, board, status, winner } = gameState;
    setCurrPlayer(nextCurrentPlayer);
    setCells(board);
    setWinner(winner);

    if (status === 'ongoing' && nextCurrentPlayer === Player.Player2) {
      handleAIMove();
    }
  }, [gameState])

  const handleAIMove = async (): Promise<void> => {
    const AIMove: number = await getAIMove(id, cells);
    await sleep(1000);
    const newCells = addAIMove({ id: AIMove, clicked: true, img: imagesPath.player2Img.src });
    setCells(newCells);
    const nextState = await checkGameState(Player.Player2, id, newCells);
    setGameState(nextState);
  }

  const isPlayersTurn = () => {
    return currPlayer == Player.Player1;
  };

  const isCellAvailable = (index: number) => {
    return !Boolean(cells[index]);
  };
  
  const handleCellClick = async (index: number) => {
    if (!isPlayersTurn() || !isCellAvailable(index)) return false;

    const nextCells = [...cells];
    nextCells[index] = 'player1';
    setCells(nextCells); 
    await sendMove(index, id, nextCells);
    const nextState = await checkGameState(Player.Player1, id, nextCells);
    setGameState(nextState);
  };

  const addAIMove = (cell: Cell) => {
    const nextCells = [...cells];
    nextCells[cell.id] = 'player2';
    return nextCells;
  };

  const handleRestart = async () => {
    setCells(initialCells.map(() => ''));
    setCurrPlayer(Player.Player1);
    const nextState = await checkGameState(Player.Player2, id, initialCells.map((cell) => null) as any[]);
    setGameState(nextState)
  };

  const handleNewGame = async () => {
    try {
      const newGame = await newGameAI();
      router.push(`/game/${newGame.gameId}`);
    } catch (error) {
      console.error('Failed to create new game:', error);
    }
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