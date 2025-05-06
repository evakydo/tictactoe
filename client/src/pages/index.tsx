import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { checkMove, Cell, initialCells, getAIMove, gameState, checkGameState, Player, imagesPath, isGameOngoing } from '../controls/gameLogic';
import { TTTCell } from './components/TTTCell';

const HomePage = () => {

  const {currentPlayer, ongoingGame} = gameState?? {};
  const [currPlayer, setCurrPlayer] = useState(currentPlayer);
  const [currMatch, setCurrMatch] = useState(ongoingGame);
  const [cells, setCells] = useState<Cell[]>(initialCells);

  const handleCellClick = async (index: number) => {
    const acceptableMove = checkMove(index);
    if (acceptableMove) {
      setCells((prevCells) =>
        prevCells.map((cell) =>
          cell.id === index ? { ...cell, clicked: true, img: imagesPath.player1Img.src } : cell
        )
      );
      let isGameOngoing = await checkGameState(Player.Player1);
      if(isGameOngoing.ongoingGame) {
        setCurrPlayer(isGameOngoing.currentPlayer);
        const AIMove: number = await getAIMove();
        setTimeout(async () => {
          addAIMove({ id: AIMove, clicked: true, img: imagesPath.player2Img.src })
          isGameOngoing = await checkGameState(Player.Player2);
          if(isGameOngoing.ongoingGame)
            setCurrPlayer(isGameOngoing.currentPlayer);
          else {
            setCurrPlayer(isGameOngoing.currentPlayer);
            setCurrMatch(isGameOngoing.ongoingGame);
          }
        }, 1000);
      }
      else {
        setCurrPlayer(isGameOngoing.currentPlayer);
        setCurrMatch(isGameOngoing.ongoingGame);
      }
    }
  };

  const addAIMove = (cell: Cell) => {
    setCells((prevCells) =>
      prevCells.map((c) =>
        c.id === cell.id ? { ...c, clicked: true, img: imagesPath.player2Img.src } : c
      )
    );
  };

  return (
    <div className={`${styles.body} ${styles[currPlayer]}`}>
      <h1>Tres en Raya</h1>
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {cells.map((cell, index) => (
            <TTTCell key={index} onClick={() => handleCellClick(index)} data={cell} />
          ))}
        </div>
      </div>
      {/* <PlayerArea currPlayer={currPlayer}/> */}
      {currMatch  && (
      <h2>Current turn: {currPlayer}</h2>
      )}
      {!currMatch  && (
      <h2>Game over</h2>
      )}
    </div>
  );
};

export default HomePage;
