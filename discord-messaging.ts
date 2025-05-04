import discordWebhookWrapper from 'discord-webhook-wrapper';
import {EmbedBuilder} from 'discord.js';
import config from './config';

const webhookClient = discordWebhookWrapper({
	discordWebhookUrl: config.discordWebhookUrl,
});

export async function sendNewSignupDiscordMessage(
	eventName: string,
	numberOfNewSignups: number,
) {
	const embedMessage = new EmbedBuilder()
		.setTitle('New event signups')
		.setFields([
			{name: 'Event', value: eventName},
			{name: 'New Signups', value: numberOfNewSignups.toString()},
		]);

	await webhookClient.send({embeds: [embedMessage]});
}
