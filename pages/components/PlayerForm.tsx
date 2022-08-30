import {
	Button,
	Flex,
	FormControl,
	HStack,
	Input,
	Stack,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
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

	const { register, handleSubmit, reset } = useForm<FormValues>({
		mode: 'onTouched',
		defaultValues: {
			player: '',
		},
	});

	return (
		<Stack spacing={6}>
			<form
				onSubmit={handleSubmit(({ player }) => {
					addPlayer(player);
					reset();
				})}
			>
				<HStack>
					<FormControl>
						<Input {...register('player')} />
					</FormControl>
					<Button type="submit">add</Button>
				</HStack>
			</form>
			{players.length && (
				<Flex flexWrap={'wrap'} gap={2}>
					{players.map((player) => (
						<Tag
							key={player}
							borderRadius="full"
							// variant={'solid'}
							// colorScheme={'blue'}
						>
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
