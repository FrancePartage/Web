import { getHost } from "@/utils/get-host";
import Cookies from 'js-cookie';

export const getSuggestions = async () => {
	const requestUrl = getHost('relations/suggestions');

	const accessToken = Cookies.get('accessToken');

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