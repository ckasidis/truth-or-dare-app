import {
	Alert,
	AlertDescription,
	AlertIcon,
	Button,
	HStack,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useQuery, useQueryClient } from 'react-query';
import { useStore } from '../lib/store';

interface GamePageProps {}

const fetchTruthOrDare = async (mode: 'truth' | 'dare' | 'truthOrDare') => {
	const url =
		mode === 'truthOrDare'
			? '/api/truth-or-dare'
			: `/api/truth-or-dare/?type=${mode}`;
	const res = await fetch(url);
	return res.json();
};

const GamePage: NextPage<GamePageProps> = ({}) => {
	const mode = useStore((state) => state.mode);
	const setMode = useStore((state) => state.setMode);

	const client = useQueryClient();

	const { data, isSuccess, isLoading, isError } = useQuery<TruthOrDare>(
		['fetchTruthOrDare', mode],
		() => fetchTruthOrDare(mode),
		{
			staleTime: Infinity,
		}
	);

	return (
		<>
			<Head>
				<title>GamePage</title>
			</Head>
			<Stack>
				<RadioGroup value={mode} onChange={setMode}>
					<HStack>
						<Radio value={'truth'}>Truth</Radio>
						<Radio value={'dare'}>Dare</Radio>
						<Radio value={'truthOrDare'}>Truth or Dare</Radio>
					</HStack>
				</RadioGroup>
				{isSuccess ? (
					<>
						<Text>{data.question}</Text>
						<Text>{data.type}</Text>
					</>
				) : isLoading ? (
					<Spinner />
				) : isError ? (
					<Alert status="error">
						<AlertIcon />
						<AlertDescription>
							Error fetching Truth or Dare questions
						</AlertDescription>
					</Alert>
				) : (
					<Alert status="info">
						<AlertIcon />
						<AlertDescription>
							You don&lsquo;t have any questions. Press<strong> Reroll </strong>
							to start
						</AlertDescription>
					</Alert>
				)}
				<Button onClick={() => client.resetQueries(['fetchTruthOrDare', mode])}>
					Reroll
				</Button>
			</Stack>
		</>
	);
};

export default GamePage;
