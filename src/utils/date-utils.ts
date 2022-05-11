export const timeSince = (date: Date) => {
	const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + " ans";
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + " mois";
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + " jours";
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + " heures";
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + " minutes";
	}
	return Math.floor(seconds) + " secondes";
}