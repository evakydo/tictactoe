import { Player } from "./player.enum";
import { State } from "./state.enum";

export interface GameState {
    currentPlayer: Player,
    boardState: number[],
    status: State,
    ongoingGame: boolean,
    gameId?: string,
  }