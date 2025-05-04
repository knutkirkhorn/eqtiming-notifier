import dotenv from 'dotenv';
import {z} from 'zod';

// Load the stored variables from `.env` file into process.env
dotenv.config();

const environmentSchema = z.object({
	DISCORD_WEBHOOK_URL: z.string().min(1),
	API_BASE_URL: z.string().min(1).default('https://live.eqtiming.com'),
});
const parsedEnvironment = environmentSchema.parse(process.env);

export default {
	discordWebhookUrl: parsedEnvironment.DISCORD_WEBHOOK_URL,
	apiBaseUrl: parsedEnvironment.API_BASE_URL,
};
