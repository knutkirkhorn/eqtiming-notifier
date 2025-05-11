import {
	checkAndCreateTable,
	getWatchingEvents,
	stopDatabaseConnection,
	updateEventSignups,
	watchEvent,
} from './database';
import {sendNewSignupDiscordMessage} from './discord-messaging';
import {getEventName, getEventSignups} from './eqtiming';

// Ensure database table exists
await checkAndCreateTable();

// TODO: find a better way to do this
// Check for command line arguments to start watching an event
const arguments_ = process.argv.slice(2);

if (arguments_.length > 0 && arguments_[0] !== undefined) {
	const eventId = Number.parseInt(arguments_[0], 10);
	const eventName = await getEventName(eventId);
	const eventSignups = await getEventSignups(eventId);

	// TODO: check if event is being watched before getting the name and signups

	const startedWatching = await watchEvent(eventId, eventName, eventSignups);

	if (startedWatching) {
		console.log(
			`Started watching event ${eventName} (${eventId}) with ${eventSignups} signups.`,
		);
	}
}

const watchingEvents = await getWatchingEvents();

for (const event of watchingEvents) {
	const eventSignups = await getEventSignups(event.eventId);
	if (eventSignups !== event.signups) {
		const numberOfNewSignups = eventSignups - event.signups;
		console.log(`Event ${event.name} has ${numberOfNewSignups} new signups.`);
		await updateEventSignups(event.eventId, eventSignups);
		await sendNewSignupDiscordMessage(
			event.eventId,
			event.name,
			numberOfNewSignups,
		);
	}
}

await stopDatabaseConnection();
