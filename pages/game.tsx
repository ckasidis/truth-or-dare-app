import { Button, Stack, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';

interface GamePageProps {}

const fetchTruthOrDare = async () => {
	const res = await fetch(`/api/truth-or-dare`);
	return res.json();
};

// const fetchTruth = async () => {
// 	const res = await fetch(`/api/truth-or-dare?type=truth`);
// 	return res.json();
// };

// const fetchDare = async () => {
// 	const res = await fetch(`/api/truth-or-dare?type=dare`);
// 	return res.json();
// };

const GamePage: NextPage<GamePageProps> = ({}) => {
	const { data, refetch, isSuccess } = useQuery<TruthOrDare>(
		'fetchTruthOrDare',
		fetchTruthOrDare,
		{ enabled: false }
	);

	return (
		<>
			<Head>
				<title>GamePage</title>
			</Head>
			<Stack>
				<Text>Truth or dare</Text>
				{isSuccess && <Text>{data.id}</Text>}
				<Button onClick={() => refetch()}>Refetch</Button>
			</Stack>
		</>
	);
};

export default GamePage;
