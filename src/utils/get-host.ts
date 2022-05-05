export const getHost = (req: string): string => {
	if (process.env.API_SERVER_URL?.endsWith('/'))
		return process.env.API_SERVER_URL + req;
	return process.env.API_SERVER_URL + '/' + req;
}