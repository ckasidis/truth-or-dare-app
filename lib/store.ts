import create from 'zustand';

interface GameSettingsState {
	mode: 'truth' | 'dare' | 'truthOrDare';
	players: string[];
	curPlayer: string | null;
	setMode: (mode: 'truth' | 'dare' | 'truthOrDare') => void;
	addPlayer: (player: string) => void;
	removePlayer: (player: string) => void;
	clearPlayers: () => void;
	randomPlayer: () => void;
}

export const useStore = create<GameSettingsState>((set) => ({
	mode: 'truthOrDare',
	players: [],
	curPlayer: null,
	setMode: (mode) => set(() => ({ mode })),
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
	clearPlayers: () => set(() => ({ players: [] })),
	randomPlayer: () =>
		set((state) => {
			if (!state.players.length) {
				return {
					curPlayer: null,
				};
			}
			let newPlayer =
				state.players[Math.floor(Math.random() * state.players.length)];
			while (newPlayer === state.curPlayer) {
				newPlayer =
					state.players[Math.floor(Math.random() * state.players.length)];
			}
			return {
				curPlayer: newPlayer,
			};
		}),
}));
