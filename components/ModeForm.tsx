import { HStack, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useStore } from '../lib/store';

interface ModeFormProps {}

const ModeForm: NextPage<ModeFormProps> = ({}) => {
	const mode = useStore((state) => state.mode);
	const setMode = useStore((state) => state.setMode);

	return (
		<RadioGroup value={mode} onChange={setMode}>
			<HStack>
				<Radio value={'truth'}>Truth</Radio>
				<Radio value={'dare'}>Dare</Radio>
				<Radio value={'truthOrDare'}>Truth or Dare</Radio>
			</HStack>
		</RadioGroup>
	);
};

export default ModeForm;
