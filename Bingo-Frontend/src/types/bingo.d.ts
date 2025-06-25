export interface BingoCard {
  _id: string;
  numbers: (number | 'FREE')[][];
  token: string;
  game: string;
  owner?: string;
}

export interface Game {
  _id: string;
  name: string;
  balls: number[];
  pattern: string;
  started: boolean;
  finished: boolean;
  winners: string[];
}
