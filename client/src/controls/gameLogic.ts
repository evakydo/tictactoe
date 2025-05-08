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

export interface GameState {
  currentPlayer: Player,
  boardState: number[],
  status: State,
  gameId?: string
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
export const newGameAI = async (): Promise<any> => {

  try {
    const response = await fetch('http://localhost:4000/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Server error');
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    return {
      gameId: '',
    };
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
export const fetchGame = async (gameId: string): Promise<GameState> => {
  try {
    const response = await fetch(`http://localhost:4000/api/game/${gameId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return {
    } as any;
  }
}

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

export interface PlayerStats {
  player: string;
  wins: number;
  losses: number;
  draws: number;
  points: number;
}

export const getLeaderBoard = async (): Promise<PlayerStats[]> => {
  try {
    const response = await fetch('http://localhost:4000/api/leaderboard', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    const resp = await response.json();
    return resp.leaderboard;
  } catch (error) {
    return [];
  }
}