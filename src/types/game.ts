import { type Mode, type Rating } from "./tod";

export type Game = {
  mode: Mode;
  rating: Rating;
  players: string[];
  curPlayer: string | null;
  setMode: (mode: Mode) => void;
  setRating: (rating: Rating) => void;
  addPlayer: (player: string) => void;
  removePlayer: (player: string) => void;
  clearPlayers: () => void;
  randomPlayer: () => void;
  resetSettings: () => void;
};
