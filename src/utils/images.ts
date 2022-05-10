export const resolveImage = (path: string): string => {
	return `http://localhost:3333/assets/${path}`;
}

export const isFileImage = (file: File): boolean => {
    return file && file['type'].split('/')[0] === 'image';
}