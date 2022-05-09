import { getHost } from "@/utils/get-host";
import cookie from 'js-cookie';

export const signIn = async (email: string, password: string) => {	
	const requestUrl = getHost('auth/local/signin');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		});

		if (response.status === 200) {
			return await response.json();
		}
	} catch (error) {
		return null;
	}

	return null;
}

export const signUp = async (email: string, username: string, firstname: string, lastname: string, password: string, acceptRgpd: boolean) => {
	const requestUrl = getHost('auth/local/signup');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				username: username,
				firstname: firstname,
				lastname: lastname,
				password: password,
				acceptRgpd: acceptRgpd
			})
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}

export const me = async (accessToken: string) => {
	try {
		const requestUrl = getHost('auth/me');

		const response = await fetch(requestUrl, {
			method: 'GET',
			credentials: "include",
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		});

		return response;
	} catch(error) {
		return null;
	}
}

export const refreshTokens = async (refreshToken: string) => {
	try {
		const requestUrl = getHost('auth/refresh');

		const response = await fetch(requestUrl, {
			method: 'POST',
			credentials: "include",
			headers: {
				Authorization: `Bearer ${refreshToken}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (response.status === 200) {
			return await response.json();
		}
	} catch(error) {
		return null;
	}
	return null;
}

export const setTokens = (accessToken: string, refreshToken: string) => {
		cookie.set('accessToken', accessToken, { expires: new Date(new Date().getTime() + 15 * 60 * 1000) });
		cookie.set('refreshToken', refreshToken, { expires: 15 });
}