import {
	Alert,
	AlertDescription,
	AlertIcon,
	Button,
	HStack,
	Icon,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useQuery, useQueryClient } from 'react-query';
import { useStore } from '../lib/store';
import PlayerForm from './components/PlayerForm';

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
	const { isOpen, onOpen, onClose } = useDisclosure();

	const mode = useStore((state) => state.mode);
	const setMode = useStore((state) => state.setMode);
	const clearPlayers = useStore((state) => state.clearPlayers);

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
				<Button onClick={onOpen}>Edit Players</Button>
			</Stack>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent pt={3}>
					<ModalBody>
						<PlayerForm />
					</ModalBody>
					<ModalFooter>
						<HStack>
							<Button
								onClick={clearPlayers}
								rightIcon={<Icon as={FaTrash} />}
								colorScheme={'red'}
								_dark={{
									color: 'red.900',
								}}
							>
								Clear Players
							</Button>
							<Button
								rightIcon={<Icon as={FaTimes} />}
								colorScheme={'blue'}
								_dark={{
									color: 'blue.900',
								}}
							>
								Close
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default GamePage;
