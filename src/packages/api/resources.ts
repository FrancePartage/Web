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

export const getResources = async (page: number, limit: number = 10) => {
    const requestUrl = `${getHost('resources')}?page=${page}&limit=${limit}`;
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
export const getPendingResources = async (page: number, limit: number = 10) => {
    const requestUrl = `${getHost('resources')}/pendings?page=${page}&limit=${limit}`;
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


export const getResourcesByTag = async (tag: any, page: number) => {
    const requestUrl = `${getHost(`resources/tags/${tag}`)}?page=${page}`;
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

export const getResource = async (id: number) => {
    const requestUrl = `${getHost('resources/first')}/${id}`;
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

        return (await response.json()).data;
    } catch (error) {
        return null;
    }
}

export const addComment = async (resourceId: number, content: string, parentId: number) => {
    const requestUrl = getHost(`resources/first/${resourceId}/comments`);
    const accessToken = getCookie('accessToken');

    try {
				let body;

				if (parentId != null) {
					body = JSON.stringify({
							content: content,
							parentId: parentId
					});
				} else {
					body = JSON.stringify({
							content: content
					});
				}

        const response: any = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: body
        });

        return await response.json();
    } catch (error) {
        return null;
    }
}

export const getComments = async (resourceId: number, page: number) => {
    const requestUrl = `${getHost(`resources/first/${resourceId}/comments`)}?page=${page}`;

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

export const searchResources = async (query: string) => {
    try {
        const requestUrl = getHost(`resources/search/${query}`);
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

export const likeResource = async (id: number) => {
    try {
        const requestUrl = getHost(`resources/first/${id}/like`);
        const accessToken = getCookie('accessToken');

        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return await response.json();
    } catch(error) {
        return null;
    }
}

export const dislikeResource = async (id: number) => {
    try {
        const requestUrl = getHost(`resources/first/${id}/like`);
        const accessToken = getCookie('accessToken');

        const response = await fetch(requestUrl, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return await response.json();
    } catch(error) {
        return null;
    }
}

export const updateStatus = async (resourceId: number, status: string) => {
    const requestUrl = getHost(`resources/first/${resourceId}/status`);
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
                status: status
            })
        });

        return response.status == 200;
    } catch (error) {
        return null;
    }
}