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

export const acceptRequest = async (requestId: number) => {
	const requestUrl = getHost('relations/request/accept');
	const accessToken = getCookie('accessToken');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'PATCH',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			},
			body: JSON.stringify({
				requestId: requestId
			})
		});

		return response.status == 200;
	} catch (error) {
		return null;
	}
}

export const denyRequest = async (requestId: number) => {
	const requestUrl = getHost('relations/request/deny');
	const accessToken = getCookie('accessToken');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'DELETE',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			},
			body: JSON.stringify({
				requestId: requestId
			})
		});

		return response.status == 200;
	} catch (error) {
		return null;
	}
}

export const deleteRelation = async (requestId: number) => {
	const requestUrl = getHost('relations');
	const accessToken = getCookie('accessToken');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'DELETE',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			},
			body: JSON.stringify({
				requestId: requestId
			})
		});

		return response.status == 200;
	} catch (error) {
		return null;
	}
}


export const cancelRequest = async (requestId: number) => {
	const requestUrl = getHost('relations/request/cancel');
	const accessToken = getCookie('accessToken');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'DELETE',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${accessToken}`
			},
			body: JSON.stringify({
				requestId: requestId
			})
		});

		return response.status == 200;
	} catch (error) {
		return null;
	}
}
