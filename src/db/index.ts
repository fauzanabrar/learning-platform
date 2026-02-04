import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
    console.error("❌ DATABASE_URL is missing from environment variables!");
} else {
    // Log masked connection string for debugging
    console.log("🔌 DB Connection String:", connectionString.replace(/:[^:@]*@/, ':****@'));
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });
