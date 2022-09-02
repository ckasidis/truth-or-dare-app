import { Heading, Stack, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = ({}) => {
	return (
		<>
			<Head>
				<title>Home Page</title>
			</Head>
			<Stack>
				<Heading as={'h1'} fontSize={'3xl'}>
					Truth Or Dare
				</Heading>
			</Stack>
		</>
	);
};

export default HomePage;
