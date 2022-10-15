import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let { type } = req.query;
	if (!type) {
		type = Math.random() < 0.5 ? 'truth' : 'dare';
	}

	const response = await fetch(
		`https://api.truthordarebot.xyz/v1/${type}?rating=pg13`
	);
	if (response.ok) {
		const truthOrDare = await response.json();
		return res.status(200).json(truthOrDare);
	}

	return res.status(400).json({ status: 400, message: 'Bad Request' });
}
