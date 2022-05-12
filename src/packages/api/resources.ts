import { getHost } from "@/utils/get-host";
import { getCookie } from "cookies-next";

export const addResource = async (title: string, cover: File, tags: Array<string>, content: string) => {
	const requestUrl = getHost('resources');
	const accessToken = getCookie('accessToken');

	try {
		const formData = new FormData();

		formData.append('title', title);
		formData.append('coverFile', cover);
		formData.append('content', content);
		tags.map(tag => formData.append('tags', tag));

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

export const uploadImage = async (image: File) => {
	const requestUrl = getHost('resources/image');
	const accessToken = getCookie('accessToken');

	try {
		const formData = new FormData();
		
		formData.append('image', image);

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

export const getResources = async (page: number) => {
	const requestUrl = `${getHost('resources')}?page=${page}`;

	try {
		const response: any = await fetch(requestUrl, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
			}
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}

export const getResourcesByTag = async (tag: any, page: number) => {
	const requestUrl = `${getHost(`resources/tags/${tag}`)}?page=${page}`;

	try {
		const response: any = await fetch(requestUrl, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
			}
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}

export const getPopularTags = async () => {
	const requestUrl = getHost('resources/tags');

	try {
		const response: any = await fetch(requestUrl, {
			method: 'GET',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json',
			}
		});

		return (await response.json()).data;
	} catch (error) {
		return [];
	}
}