type TruthOrDare = {
	translations: Translation;
	id: string;
	type: 'TRUTH' | 'DARE';
	rating: 'PG' | 'PG13' | 'R';
	question: string;
};

type Translation = {
	bn: string | null;
	de: string | null;
	es: string | null;
	fr: string | null;
	hi: string | null;
	tl: string | null;
};
