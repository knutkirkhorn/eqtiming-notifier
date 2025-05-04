import {
	checkAndCreateTable,
	stopDatabaseConnection,
	watchEvent,
} from './database';
import {getEventName, getEventSignups} from './eqtiming';

// Ensure database table exists
await checkAndCreateTable();

// TODO: find a better way to do this
// Check for command line arguments to start watching an event
const arguments_ = process.argv.slice(2);
console.log('args', arguments_);

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

await stopDatabaseConnection();
