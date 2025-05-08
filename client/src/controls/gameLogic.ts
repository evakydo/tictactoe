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
  player1Img: nigiriImg,
  player2Img: sushiImg,
};

export type Cell = {
  id: number;
  clicked: boolean;
  img: string;
};

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
}

export const initialCells: Cell[] = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  clicked: false,
  img: ''
}));

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

export const checkGameState = async (player: string, gameId: string, boardState: string[]): Promise<any> => {
  try {
    const response = await fetch('http://localhost:4000/api/checkGameState', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardState, player, gameId }),
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
};

export const sendMove = async (index: number, gameId: string, boardState: string[]): Promise<string> => {
  try {
    const response = await fetch('http://localhost:4000/api/playerMove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, boardState, gameId }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return 'fail';
  }
};

export const getAIMove = async (gameId: string, boardState: string[]): Promise<number> => {
  try {
    const response = await fetch('http://localhost:4000/api/AIMove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardState, gameId }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();
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