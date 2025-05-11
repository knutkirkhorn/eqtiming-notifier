import knex from 'knex';
import {getEventName, getEventSignups} from './eqtiming';

const databaseConfig = {
	client: 'sqlite3',
	connection: {
		filename: './data.db',
	},
	useNullAsDefault: true,
};
const knexInstance = knex(databaseConfig);
const watchingEventsTableName = 'watching_events';

export async function checkAndCreateTable() {
	// Check if database table exists, if not create it
	const tableExists = await knexInstance.schema.hasTable(
		watchingEventsTableName,
	);
	if (tableExists) return;

	await knexInstance.schema.createTable(watchingEventsTableName, table => {
		table.increments('event_id').primary();
		table.string('name').notNullable();
		table.integer('signups').notNullable();
	});
}

export async function watchEvent(eventId: number) {
	// Check if the event is already being watched
	const rows = await knexInstance(watchingEventsTableName).where({
		event_id: eventId,
	});
	const isWatchingEvent = rows.length > 0;
	const [event] = rows;

	if (isWatchingEvent) {
		console.log(
			`Event '${event.name}' (${event.event_id}) is already being watched.`,
		);
		return {startedWatching: false, name: event.name, signups: event.signups};
	}

	const name = await getEventName(eventId);
	const signups = await getEventSignups(eventId);

	await knexInstance(watchingEventsTableName).insert({
		event_id: eventId,
		name: name,
		signups: signups,
	});

	return {startedWatching: true, name, signups};
}

export async function getWatchingEvents() {
	const rows = await knexInstance(watchingEventsTableName).select(
		'event_id',
		'name',
		'signups',
	);
	return rows.map(row => ({
		eventId: row.event_id,
		name: row.name,
		signups: row.signups,
	}));
}

export async function updateEventSignups(eventId: number, signups: number) {
	await knexInstance(watchingEventsTableName)
		.where({event_id: eventId})
		.update({signups: signups});
}

export async function stopDatabaseConnection() {
	await knexInstance.destroy();
}
