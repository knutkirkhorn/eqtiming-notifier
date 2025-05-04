import {z} from 'zod';
import config from './config';

export async function getEventName(eventId: number) {
	const eventResponse = await fetch(
		`${config.apiBaseUrl}/api/Event/${eventId}`,
	);
	const eventData = await eventResponse.json();

	// Parse response with zod
	const eventSchema = z.object({
		Navn: z.string().min(1),
	});
	const parsedEventData = eventSchema.parse(eventData);

	return parsedEventData.Navn;
}

export async function getEventSignups(eventId: number) {
	const eventResponse = await fetch(
		`${config.apiBaseUrl}/api/Startlist/${eventId}/0`,
	);
	const signupsData = await eventResponse.json();

	// Parse response with zod
	const signupsSchema = z.object({
		TotalItems: z.number(),
	});
	const parsedSignupsData = signupsSchema.parse(signupsData);

	return parsedSignupsData.TotalItems;
}
