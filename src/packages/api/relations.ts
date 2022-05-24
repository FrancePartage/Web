import { getHost } from "@/utils/get-host";
import { getCookie } from "cookies-next";

export const getSuggestions = async () => {
	const requestUrl = getHost('relations/suggestions');
	const accessToken = getCookie('accessToken');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}

export const getRelationWith = async (id: number) => {
	const requestUrl = getHost(`relations/user/${id}`);
	const accessToken = getCookie('accessToken');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}

export const addRelation = async (recipientId: number, type: string) => {
	const requestUrl = getHost(`relations/request`);
	const accessToken = getCookie('accessToken');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			},
			body: JSON.stringify({
				recipientId: recipientId,
				type: type
			})
		});

		return response.status == 201;
	} catch (error) {
		return null;
	}
}

export const getRequests = async () => {
	const requestUrl = getHost('relations/requests');
	const accessToken = getCookie('accessToken');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			}
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}