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

export async function stopDatabaseConnection() {
	await knexInstance.destroy();
}
