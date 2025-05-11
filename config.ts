import dotenv from 'dotenv';
import {z} from 'zod';

// Load the stored variables from `.env` file into process.env
dotenv.config();

const environmentSchema = z.object({
	DISCORD_WEBHOOK_URL: z.string().min(1),
	API_BASE_URL: z.string().min(1).default('https://live.eqtiming.com'),
	WATCHING_EVENT_IDS: z
		.string()
		.default('')
		.transform(string_ => (string_ ? string_.split(',').map(Number) : [])),
});
const parsedEnvironment = environmentSchema.parse(process.env);

export default {
	discordWebhookUrl: parsedEnvironment.DISCORD_WEBHOOK_URL,
	apiBaseUrl: parsedEnvironment.API_BASE_URL,
	watchingEventIds: parsedEnvironment.WATCHING_EVENT_IDS,
};
