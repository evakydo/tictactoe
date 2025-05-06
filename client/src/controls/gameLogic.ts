import sushiImg from "../assets/sushi.png";
import nigiriImg from "../assets/nigiri.png";

export enum Player {
  Player1 = 'player1',
  Player2 = 'player2',
  None = 'none'
}

export enum State {
  Win = 'win',
  Tie = 'tie',
  Ongoing = 'ongoing',
  Fail = 'fail',
}

export const gameState = {
  currentPlayer: Player.Player1,
  boardState: Array(9).fill(null),
  status: State.Ongoing,
  ongoingGame: true
};

export function isGameOngoing() {
  return gameState.ongoingGame;
}

export const imagesPath = {
  player1Img: sushiImg,
  player2Img: nigiriImg,
};

export type Cell = {
  id: number;
  clicked: boolean;
  img: string;
};

export const checkMove = (index: number) => {
  if(isPlayersTurn() && isCellAvailable(index)) {
    gameState.boardState[index] = Player.Player1;
    sendMove(index);
    return gameState.ongoingGame;
  }
  else 
    return false;
}

const isPlayersTurn = () => {
  return gameState.currentPlayer == Player.Player1;
};

const isCellAvailable = (index: number) => {
  return !gameState.boardState[index];
};

export const initialCells: Cell[] = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  clicked: false,
  img: ''
}));

export const checkGameState = async (player: string): Promise<typeof gameState> => {
  try {
    const boardState = gameState.boardState;
    const response = await fetch('http://localhost:4000/api/checkGameState', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({boardState, player}),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    const data = await response.json();
    if(data.result === State.Win || data.result === State.Tie) {
      gameState.currentPlayer = Player.None;
      gameState.ongoingGame = false;
      return { currentPlayer: Player.None,
        boardState: boardState,
        status: data.result,
        ongoingGame: false };
    }
    else if(player === Player.Player2) {
      gameState.currentPlayer = Player.Player1;
    }
    else if(player === Player.Player1) {
      gameState.currentPlayer = Player.Player2;
    }
    return { currentPlayer: gameState.currentPlayer,
      boardState: boardState,
      status: data.result,
      ongoingGame: true };
  } catch (error) {
    return { currentPlayer: gameState.currentPlayer,
      boardState: gameState.boardState,
      status: gameState.status,
      ongoingGame: false };
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
    if(data.index == -1) {
      gameState.ongoingGame = false;
      gameState.currentPlayer = Player.None;
    }
    return data.index;
  } catch (error) {
    return 'fail';
  }
};

export const getAIMove = async (): Promise<number> => {
  const boardState = gameState.boardState
  try {
    const response = await fetch('http://localhost:4000/api/AIMove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardState  }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    
    const data = await response.json();
    gameState.boardState[data.index] = Player.Player2;

    return data.index;
  } catch (error) {
    return -1;
  }
};
