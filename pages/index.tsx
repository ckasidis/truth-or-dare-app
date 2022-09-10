import {
	Alert,
	AlertDescription,
	AlertIcon,
	Badge,
	Button,
	Center,
	Flex,
	Heading,
	HStack,
	Icon,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Spinner,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import {
	FaCog,
	FaPen,
	FaPlus,
	FaQuestion,
	FaRedo,
	FaTimes,
	FaTrash,
	FaUser,
} from 'react-icons/fa';
import { useQuery, useQueryClient } from 'react-query';
import { useStore } from '../lib/store';
import ModeForm from '../components/ModeForm';
import PlayerForm from '../components/PlayerForm';

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
	const playerForm = useDisclosure();
	const modeForm = useDisclosure();

	const [mode, players, curPlayer, clearPlayers, randomPlayer] = useStore(
		(state) => [
			state.mode,
			state.players,
			state.curPlayer,
			state.clearPlayers,
			state.randomPlayer,
		]
	);

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
				<title>Truth or Dare</title>
			</Head>
			<Stack
				spacing={6}
				justifyContent={'center'}
				minH={'100vh'}
				maxW={'container.sm'}
				px={{ base: '5%', md: '0' }}
				mx={'auto'}
			>
				<Heading as={'h1'} textAlign={'center'}>
					{curPlayer ? `${curPlayer}'s turn` : `Truth or Dare`}
				</Heading>
				{isSuccess ? (
					<Stack>
						<Flex>
							<Badge fontSize={'lg'}>
								<Text>{data.type}</Text>
							</Badge>
						</Flex>
						<Text fontSize={'lg'}>{data.question}</Text>
					</Stack>
				) : isLoading ? (
					<Center>
						<Spinner />
					</Center>
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
							You don&lsquo;t have any questions. Press
							<strong> Reroll </strong>
							to start
						</AlertDescription>
					</Alert>
				)}
				<Stack>
					<Button
						colorScheme={'blue'}
						onClick={() => {
							client.resetQueries(['fetchTruthOrDare', mode]);
							randomPlayer();
						}}
						rightIcon={<FaRedo />}
					>
						{players.length ? 'Reroll Player and Question' : 'Reroll Question'}
					</Button>
					<HStack>
						<Stack flex={1}>
							{players.length && (
								<Button
									onClick={() => randomPlayer()}
									size={'sm'}
									rightIcon={<FaUser />}
								>
									Reroll Player
								</Button>
							)}
							<Button
								onClick={playerForm.onOpen}
								size={'sm'}
								rightIcon={players.length ? <FaPen /> : <FaPlus />}
								colorScheme={'red'}
							>
								{players.length ? 'Edit Players' : 'Add Players'}
							</Button>
						</Stack>
						<Stack flex={1}>
							{players.length && (
								<Button
									onClick={() =>
										client.resetQueries(['fetchTruthOrDare', mode])
									}
									size={'sm'}
									rightIcon={<FaQuestion />}
								>
									Reroll Question
								</Button>
							)}
							<Button
								onClick={modeForm.onOpen}
								size={'sm'}
								rightIcon={<FaCog />}
								colorScheme={'red'}
							>
								Select Mode
							</Button>
						</Stack>
					</HStack>
				</Stack>
			</Stack>
			<Modal isOpen={playerForm.isOpen} onClose={playerForm.onClose}>
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
							>
								Clear Players
							</Button>
							<Button
								onClick={playerForm.onClose}
								rightIcon={<Icon as={FaTimes} />}
								colorScheme={'blue'}
							>
								Close
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Modal isOpen={modeForm.isOpen} onClose={modeForm.onClose}>
				<ModalOverlay />
				<ModalContent pt={3}>
					<ModalBody>
						<ModeForm />
					</ModalBody>
					<ModalFooter>
						<HStack>
							<Button
								onClick={modeForm.onClose}
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
