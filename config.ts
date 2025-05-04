import dotenv from 'dotenv';
import {z} from 'zod';

// Load the stored variables from `.env` file into process.env
dotenv.config();

const environmentSchema = z.object({
	API_BASE_URL: z.string().min(1).default('https://live.eqtiming.com'),
});
const parsedEnvironment = environmentSchema.parse(process.env);

export default {
	apiBaseUrl: parsedEnvironment.API_BASE_URL,
};
