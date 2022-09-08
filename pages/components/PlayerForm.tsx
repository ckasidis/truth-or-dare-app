import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	HStack,
	Input,
	Stack,
	Tag,
	TagCloseButton,
	TagLabel,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useStore } from '../../lib/store';

interface PlayerFormProps {}

const PlayerForm: NextPage<PlayerFormProps> = ({}) => {
	const players = useStore((state) => state.players);
	const addPlayer = useStore((state) => state.addPlayer);
	const removePlayer = useStore((state) => state.removePlayer);

	type FormValues = {
		player: string;
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			player: '',
		},
	});

	const isValidPlayer = (player: string) => {
		if (players.includes(player)) return 'cannot have duplicate names';
		if (player.length < 1) return 'name cannot be empty';
		if (player.length > 20) return 'name cannot have more than 20 characters';
		return true;
	};

	return (
		<Stack spacing={6}>
			<form
				onSubmit={handleSubmit(({ player }) => {
					addPlayer(player);
					reset();
				})}
			>
				<HStack>
					<FormControl isInvalid={!!errors.player}>
						<HStack>
							<Input {...register('player', { validate: isValidPlayer })} />
							<Button type="submit">add</Button>
						</HStack>
						<FormErrorMessage>{errors.player?.message}</FormErrorMessage>
					</FormControl>
				</HStack>
			</form>
			{players.length && (
				<Flex flexWrap={'wrap'} gap={2}>
					{players.map((player) => (
						<Tag key={player} borderRadius="full">
							<TagLabel>{player}</TagLabel>
							<TagCloseButton onClick={() => removePlayer(player)} />
						</Tag>
					))}
				</Flex>
			)}
		</Stack>
	);
};

export default PlayerForm;
