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
				'Content-Type': 'multipart/form-data',
				'Authorization': `Bearer ${accessToken}`
			},
			body: formData
		});

		return await response.json();
	} catch (error) {
		return null;
	}
}