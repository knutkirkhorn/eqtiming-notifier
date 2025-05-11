import discordWebhookWrapper from 'discord-webhook-wrapper';
import {EmbedBuilder} from 'discord.js';
import config from './config';

const webhookClient = discordWebhookWrapper({
	discordWebhookUrl: config.discordWebhookUrl,
});

export async function sendNewSignupDiscordMessage(
	eventId: number,
	eventName: string,
	numberOfNewSignups: number,
) {
	const embedMessage = new EmbedBuilder()
		.setTitle('New event signups')
		.setFields([
			{name: 'Event', value: eventName},
			{name: 'New signups', value: numberOfNewSignups.toString()},
			{
				name: 'Go to event',
				value: `[View event here](${config.apiBaseUrl}/${eventId}#contestants)`,
			},
		]);

	await webhookClient.send({embeds: [embedMessage]});
}
