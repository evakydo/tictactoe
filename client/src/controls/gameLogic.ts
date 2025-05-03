import sushiImg from "../assets/sushi.png";
import nigiriImg from "../assets/nigiri.png";

export const checkMove = (index: number, cell: Cell) => {
  const playerTurn = isPlayersTurn();
  if(playerTurn && !cell.clicked) {
    console.log('make move')
    return true;
  }
  else 
    return false;
}

const isPlayersTurn = () => {
  return true;
};

export const gameController = (index: number) => {
  checkGameState(index);
  addMoveToBoard(index);
};

export const imagesPath = {
  img1: sushiImg,
  img2: nigiriImg,
};

export type Cell = {
  id: number;
  clicked: boolean;
};

export const initialCells: Cell[] = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  clicked: false,
}));

export const checkGameState = async (index: number): Promise<string> => {
  try {
    const response = await fetch('http://localhost:4000/api/gameState', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    return 'fail';
  }
};

export const addMoveToBoard = (index: number) => {
};
