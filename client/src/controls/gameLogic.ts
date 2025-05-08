import sushiImg from "../assets/sushi.png";
import nigiriImg from "../assets/nigiri.png";
import { PlayerStats } from "@/models/playerStats.interface";
import { GameState } from "@/models/gameState.interface";

const SERVER_URI = process.env.NEXT_PUBLIC_SERVER_URI;

export const imagesPath = {
  player1Img: nigiriImg,
  player2Img: sushiImg,
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

export const fetchGame = async (gameId: string): Promise<GameState> => {
  try {
    const response = await fetch(`${SERVER_URI}/api/game/${gameId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    return await response.json();
  } catch (error) {
    return {
    } as any;
  }
};

export const createNewGame = async (): Promise<any> => {

  try {
    const response = await fetch(`${SERVER_URI}/api/game`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    return await response.json();
  } catch (error) {
    return {
      gameId: '', // fallback
    };
  }
}

export const checkGameState = async (player: string, gameId: string, boardState: string[]): Promise<any> => {
  try {
    const response = await fetch(`${SERVER_URI}/api/checkGameState`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardState, player, gameId }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    return await response.json();
  } catch (error) {
    return {
    } as any;
  }
};

export const sendMove = async (index: number, gameId: string, boardState: string[]): Promise<string> => {
  try {
    const response = await fetch(`${SERVER_URI}/api/playerMove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ index, boardState, gameId }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }

    return await response.json();
  } catch (error) {
    return 'fail'; 
  }
};

export const getAIMove = async (gameId: string, boardState: string[]): Promise<any> => {
  try {
    const response = await fetch(`${SERVER_URI}/api/AIMove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardState, gameId }),
    });

    if (!response.ok) {
      throw new Error('Server error');
    }
    return await response.json();
  } catch (error) {
    return {};
  }
};

export const getLeaderBoard = async (): Promise<PlayerStats[]> => {
  try {
    const response = await fetch(`${SERVER_URI}/api/leaderboard`, {
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
};
