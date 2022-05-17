import { getHost } from "@/utils/get-host";

export const getUserInformations = async (userId: number) => {
	try {
		const requestUrl = getHost(`users/${userId}`);

		const response = await fetch(requestUrl, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
			}
		});

		return await response.json();
	} catch(error) {
		return null;
	}
}