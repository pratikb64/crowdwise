export function debounce<T extends (...args: any[]) => any>(
	fn: T,
	delay = 300,
): (...args: Parameters<T>) => void {
	let timer: number | undefined;
	return (...args: Parameters<T>) => {
		if (timer) clearTimeout(timer);
		timer = window.setTimeout(() => fn(...args), delay);
	};
}
