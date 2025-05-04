import sushiImg from "../assets/sushi.png";
import nigiriImg from "../assets/nigiri.png";

export const gameState = {
  currPlayer: 'you',
  boardState: Array(9).fill(null)
};

export const checkMove = (index: number, cell: Cell) => {
  if(isPlayersTurn() && isCellAvailable(index)) {
    //check state of board on the server
    //return true if game is still on
    gameState.boardState[index] = 'player';
    sendMove(index);
    return true;
  }
  else 
    return false;
}

const isPlayersTurn = () => {
  if(gameState.currPlayer == 'you')
    return true;
  else 
    return false;
};

const isCellAvailable = (index: number) => {
  if(!gameState.boardState[index])
    return true;
  else 
    return false;
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
  img: string;
};

export const initialCells: Cell[] = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  clicked: false,
  img: ''
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

export const sendMove = async (index: number): Promise<string> => {
  const boardState = gameState.boardState
  try {
    const response = await fetch('http://localhost:4000/api/playerMove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, boardState }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    
    const data = await response.json();
    console.log(data)
    
    return data.index;
  } catch (error) {
    return 'fail';
  }
};

export const getAIMove = async (index: number): Promise<number> => {
  const boardState = gameState.boardState
  try {
    const response = await fetch('http://localhost:4000/api/AIMove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, boardState  }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    
    const data = await response.json();
    console.log(data)
    
    return data.index;
  } catch (error) {
    return -1;
  }
};

export const addMoveToBoard = (index: number) => {
};
