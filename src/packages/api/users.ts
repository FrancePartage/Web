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

export const getUserResources = async (userId: number, page: number) => {
	try {
		const requestUrl = `${getHost(`users/${userId}/resources`)}?page=${page}`;

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

export const getUserRelations = async (userId: number, page: number) => {
	try {
		const requestUrl = `${getHost(`users/${userId}/relations`)}?page=${page}`;

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