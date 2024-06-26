// import 'dotenv/config';
import type { Config } from 'drizzle-kit';




export default {
    schema: 'src/schema/',
    out: './migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;