import type { CV } from '../types/cv';

const STORAGE_KEY = 'cv-builder-data';

export function saveCV(data: CV): void {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, version: 1 }));
	} catch (e) {
		console.error('Failed to save CV data to localStorage', e);
	}
}

export function loadCV(): CV | null {
	if (typeof localStorage === 'undefined') return null;

	try {
		const response = localStorage.getItem(STORAGE_KEY);

		if (!response) return null;

		const { version, data } = JSON.parse(response);

		return data;
	} catch (e) {
		console.error('Failed to parse CV data from localStorage', e);
		return null;
	}
}

export function clearCV(): void {
	if (typeof localStorage === 'undefined') return;
	localStorage.removeItem(STORAGE_KEY);
}
