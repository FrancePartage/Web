import { getHost } from '@/utils/get-host';
import { getCookie } from 'cookies-next';

export const getUsers = async (page: number, limit: number = 10) => {
	const requestUrl = `${getHost('users')}?page=${page}&limit=${limit}`;
	const accessToken = getCookie('accessToken');

	try {
		const headers: any = {
			'Accept': '*/*',
			'Content-Type': 'application/json'
		};

		if (accessToken) {
			headers['Authorization'] = `Bearer ${accessToken}`;
		}

		const response: any = await fetch(requestUrl, {
			method: 'GET',
			headers: headers
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}


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
		const accessToken = getCookie('accessToken');

		const headers: any = {
			'Accept': '*/*',
			'Content-Type': 'application/json'
		};

		if (accessToken) {
			headers['Authorization'] = `Bearer ${accessToken}`;
		}

		const response = await fetch(requestUrl, {
			method: 'GET',
			headers: headers
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

export const updateInformation = async (username: string, firstName: string, lastName: string) => {
	const requestUrl = getHost('users/informations');
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
				username: username,
				firstname: firstName,
				lastname: lastName
			})
		});

		if (response.status == 200) {
			return true;
		} else {
			return await response.json();
		}
	} catch (error) {
		return error;
	}
}

export const updatePassword = async (oldPassword: string, newPassword: string) => {
	const requestUrl = getHost('users/password');
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
				oldPassword: oldPassword,
				newPassword: newPassword
			})
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}

export const updateAvatar = async (avatar: File) => {
	const requestUrl = getHost('users/avatar');
	const accessToken = getCookie('accessToken');

	try {
		const formData = new FormData();

		formData.append('file', avatar);

		const response: any = await fetch(requestUrl, {
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Authorization': `Bearer ${accessToken}`
			},
			body: formData
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}

export const searchUsers = async (query: string) => {
	try {
		const requestUrl = getHost(`users/search/${query}`);

		const response = await fetch(requestUrl, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json'
			}
		});

		return await response.json();
	} catch(error) {
		console.log(error);
		return null;
	}
}

export const updateUserRole = async (userId: number, role: string) => {
	const requestUrl = getHost(`users/${userId}/role`);
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
				role: role
			})
		});

		return response.status == 200;
	} catch (error) {
		return null;
	}
}