import {
	checkAndCreateTable,
	getWatchingEvents,
	stopDatabaseConnection,
	updateEventSignups,
	watchEvent,
} from './database';
import {sendNewSignupDiscordMessage} from './discord-messaging';
import {getEventSignups} from './eqtiming';

// Ensure database table exists
await checkAndCreateTable();

// TODO: find a better way to do this
// Check for command line arguments to start watching an event
const arguments_ = process.argv.slice(2);

if (arguments_.length > 0 && arguments_[0] !== undefined) {
	const eventId = Number.parseInt(arguments_[0], 10);
	const event = await watchEvent(eventId);

	if (event.startedWatching) {
		console.log(
			`Started watching event ${event.name} (${eventId}) with ${event.signups} signups.`,
		);
	}
}

const watchingEvents = await getWatchingEvents();

for (const event of watchingEvents) {
	const newEventSignups = await getEventSignups(event.eventId);
	if (newEventSignups !== event.signups) {
		const numberOfNewSignups = newEventSignups - event.signups;
		console.log(`Event ${event.name} has ${numberOfNewSignups} new signups.`);
		await updateEventSignups(event.eventId, newEventSignups);
		await sendNewSignupDiscordMessage(
			event.eventId,
			event.name,
			numberOfNewSignups,
		);
	}
}

await stopDatabaseConnection();
