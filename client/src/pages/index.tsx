import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { checkMove, Cell, initialCells} from '../controls/gameLogic';
import Background from '../assets/sushi.png';

const HomePage: React.FC = () => {

  const [cells, setCells] = useState<Cell[]>(initialCells);

  const handleCellClick = (index: number, cell: Cell) => {
    const acceptableMove = checkMove(index, cell);
    if(acceptableMove) {
      setCells((prevCells) =>
        prevCells.map((cell) =>
          cell.id === index ? { ...cell, clicked: true } : cell
        )
      );
    }
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
                  src={Background.src}
                />
              )}
            </div>
          ))}
          </div>
        </div>
        <h2>Current turn</h2>
    </div>
  );
};

export default HomePage;
