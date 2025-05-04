import knex from 'knex';

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

export async function watchEvent(
	eventId: number,
	name: string,
	signups: number,
) {
	// Check if the event is already being watched
	const rows = await knexInstance(watchingEventsTableName)
		.where({event_id: eventId})
		.select('event_id');

	if (rows.length > 0) {
		console.log(`Event ${eventId} is already being watched.`);
		return false;
	}

	await knexInstance(watchingEventsTableName).insert({
		event_id: eventId,
		name: name,
		signups: signups,
	});

	return true;
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
