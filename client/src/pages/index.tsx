import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { checkMove, Cell, initialCells, getAIMove, gameState} from '../controls/gameLogic';
import Background from '../assets/sushi.png';
import BackgroundAI from '../assets/nigiri.png';

const HomePage: React.FC = () => {

  const [cells, setCells] = useState<Cell[]>(initialCells);
  const handleCellClick = async (index: number, cell: Cell) => {
    const acceptableMove = checkMove(index, cell);
    if(acceptableMove) {
      setCells((prevCells) =>
        prevCells.map((cell) =>
          cell.id === index ? { ...cell, clicked: true, img:Background.src} : cell
        )
      );
      console.log(gameState.boardState)
      gameState.currPlayer = 'AI';
      const AIMove: number = await getAIMove(index);
      setTimeout(async () => {
        addAIMove({id: AIMove, clicked: true, img:BackgroundAI.src})
        gameState.currPlayer = 'you';
        gameState.boardState[AIMove] = 'AI';
        console.log(gameState.boardState)
      }, 1000);
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
    <div className={styles.body}>
        <h1>Tres en Raya</h1>
        <div className={styles.boardWrapper}>
          <div className={styles.board}>
          {cells.map((cell,index) => (
            <div
              key = {index}
              data-cell={index}
              className={styles.cell}
              onClick={() => handleCellClick(index, cell)}
            >
              {cell.clicked && (
                <img
                  className={styles.cellImage}
                  src={cell.img}
                />
              )}
            </div>
          ))}
          </div>
        </div>
        <h2>Current turn</h2>
        <h2>{gameState.currPlayer}</h2>
    </div>
  );
};

export default HomePage;
