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