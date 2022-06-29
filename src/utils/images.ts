export const resolveImage = (path: string): string => {
	return `http://api-francepartage.zapto.org/assets/${path}`;
}

export const isFileImage = (file: File): boolean => {
    return file && file['type'].split('/')[0] === 'image';
}