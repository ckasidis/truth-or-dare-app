import { create } from "zustand";

import { type Game } from "@/types/game";

export const useStore = create<Game>((set) => ({
  mode: "tod",
  rating: "pg13",
  players: [],
  curPlayer: null,
  setMode: (mode) => set(() => ({ mode })),
  setRating: (rating) => set(() => ({ rating })),
  addPlayer: (player) =>
    set((state) => {
      if (
        state.players.includes(player) ||
        player.length < 1 ||
        player.length > 20
      )
        return {};
      return {
        players: [player, ...state.players],
      };
    }),
  removePlayer: (player) =>
    set((state) => ({
      curPlayer: null,
      players: state.players.filter((cur) => cur !== player),
    })),
  clearPlayers: () =>
    set(() => ({
      curPlayer: null,
      players: [],
    })),
  randomPlayer: () =>
    set((state) => {
      if (!state.players.length) {
        return {
          curPlayer: null,
        };
      }
      let newPlayer =
        state.players[Math.floor(Math.random() * state.players.length)];
      while (state.players.length > 1 && newPlayer === state.curPlayer) {
        newPlayer =
          state.players[Math.floor(Math.random() * state.players.length)];
      }
      return {
        curPlayer: newPlayer,
      };
    }),
  resetSettings: () =>
    set(() => ({
      mode: "tod",
      rating: "pg13",
    })),
}));
