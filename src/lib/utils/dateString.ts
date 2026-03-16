import { parseDateTime } from '@internationalized/date';

export const dateString = (startDate: string | undefined, endDate: string | undefined) => {
	if (typeof startDate !== 'string') return null;

	const start = parseDateTime(startDate);
	const end = typeof endDate === 'string' ? parseDateTime(endDate) : undefined;

	return `${start?.month}/${start?.year} — ${
		end?.month !== undefined ? `${end?.month}/${end?.year}` : 'Nykyinen'
	}`;
};
