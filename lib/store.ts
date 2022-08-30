import create from 'zustand';

interface GameSettingsState {
	mode: 'truth' | 'dare' | 'truthOrDare';
	players: string[];
	setMode: (mode: 'truth' | 'dare' | 'truthOrDare') => void;
	addPlayer: (player: string) => void;
	removePlayer: (player: string) => void;
	clearPlayers: () => void;
}

export const useStore = create<GameSettingsState>((set) => ({
	mode: 'truthOrDare',
	players: [],
	setMode: (mode) => set(() => ({ mode })),
	addPlayer: (player) =>
		set((state) => ({
			players: [player, ...state.players],
		})),
	removePlayer: (player) =>
		set((state) => ({
			players: state.players.filter((cur) => cur !== player),
		})),
	clearPlayers: () => set(() => ({ players: [] })),
}));
