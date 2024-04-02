import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
// for migrations
export const connectionString = process.env.DATABASE_URL as string;
console.log(connectionString);

export const client = postgres(connectionString);
export const db = drizzle(client);

