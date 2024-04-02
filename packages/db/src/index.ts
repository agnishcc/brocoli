import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { connectionString } from './db/db';
import postgres from 'postgres';

// Don't forget to close the connection, otherwise the script will hang

const migrationsClient = postgres(connectionString, {
    max: 1,
});
const db = drizzle(migrationsClient);

(async () => {
    await migrate(db, { migrationsFolder: './drizzle' });
    await migrationsClient.end();
})();

