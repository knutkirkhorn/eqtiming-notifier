import {checkAndCreateTable, stopDatabaseConnection} from './database';

// Ensure database table exists
await checkAndCreateTable();

await stopDatabaseConnection();
