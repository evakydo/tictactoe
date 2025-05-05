import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { checkMove, Cell, initialCells, getAIMove, gameState } from '../controls/gameLogic';
import Background from '../assets/sushi.png';
import BackgroundAI from '../assets/nigiri.png';
import { TTTCell } from './components/TTTCell';


const HomePage = () => {

  const [cells, setCells] = useState<Cell[]>(initialCells);


  const handleCellClick = async (index: number, cell: Cell) => {
    const acceptableMove = checkMove(index, cell);
    if (acceptableMove) {
      setCells((prevCells) =>
        prevCells.map((cell) =>
          cell.id === index ? { ...cell, clicked: true, img: Background.src } : cell
        )
      );
      if(gameState.ongoingGame) {
        const AIMove: number = await getAIMove(index);
        setTimeout(async () => {
          addAIMove({ id: AIMove, clicked: true, img: BackgroundAI.src })
          gameState.boardState[AIMove] = 'player2';
          gameState.currPlayer = 'player1';
        }, 1000);
      }
      else
        gameState.currPlayer = 'none';
    }
  };

  const addAIMove = (cell: Cell) => {
    setCells((prevCells) =>
      prevCells.map((c) =>
        c.id === cell.id ? { ...c, clicked: true, img: BackgroundAI.src } : c
      )
    );
  };

  return (
    <div className={`${styles.body} ${styles[gameState.currPlayer]}`}>
      <h1>Tres en Raya</h1>
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {cells.map((cell, index) => (
            <TTTCell key={index} onClick={() => handleCellClick(index, cell)} data={cell} />
          ))}
        </div>
      </div>
      {gameState.ongoingGame  && (
      <h2>Current turn <br></br>{gameState.currPlayer}</h2>
      )}
      {!gameState.ongoingGame  && (
      <h2>Game over</h2>
      )}
    </div>
  );
};

export default HomePage;
