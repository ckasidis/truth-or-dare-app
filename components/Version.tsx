import { Badge, HStack, StackProps, Text } from '@chakra-ui/react';
import { NextPage } from 'next';

interface VersionProps extends StackProps {}

const Version: NextPage<VersionProps> = ({ ...props }) => {
	return (
		<HStack {...props}>
			<Badge>v1.0</Badge>
			<Text fontWeight={'semibold'}>tod-app</Text>
		</HStack>
	);
};

export default Version;
