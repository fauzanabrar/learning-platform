import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load .env first, then .env.local to override if needed (standard Next.js behaviorish manually)
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

async function setupDatabase() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error('❌ DATABASE_URL is not defined in .env or .env.local');
        // Debug: check what env vars ARE defined
        console.log('Available Env Vars:', Object.keys(process.env).filter(k => k.includes('DB') || k.includes('URL')));
        process.exit(1);
    }

    // Debug log to confirm what we loaded (masking password)
    console.log(`Loaded DATABASE_URL: ${dbUrl.replace(/:[^:@]*@/, ':****@')}`);

    // Parse the connection string to connect to 'postgres' database first for admin tasks
    // Assumption: Connection string is in format postgres://user:pass@host:port/dbname
    // We replace the last segment (dbname) with 'postgres'

    // Simple regex replacement for the db name at the end
    const adminUrl = dbUrl.replace(/\/[^/?]+(\?.*)?$/, '/postgres$1');

    // If the original URL was already creating a connection to postgres, we might just use it, 
    // but usually users define the target DB (ccr_db). 

    console.log(`Connecting to admin database at: ${adminUrl.replace(/:[^:@]*@/, ':****@')}`); // Log masked URL

    const adminSql = postgres(adminUrl);

    try {
        const targetDbName = 'ccr_db';
        // Extract target DB name from original URL if possible, or default to ccr_db
        // But for this setup script, let's Stick to checking 'ccr_db' as per our hardcoded target in other files, 
        // OR we should ideally parse it from the DATABASE_URL.
        // Let's assume the user's DATABASE_URL *is* the target.

        // Better approach: Parse the DB name from the process.env.DATABASE_URL
        const urlParts = new URL(dbUrl);
        const dbNameFromUrl = urlParts.pathname.slice(1); // remove leading /

        console.log(`Checking if database '${dbNameFromUrl}' exists...`);

        const result = await adminSql`SELECT 1 FROM pg_database WHERE datname = ${dbNameFromUrl}`;

        if (result.length === 0) {
            console.log(`Database '${dbNameFromUrl}' does not exist. Creating...`);
            await adminSql.unsafe(`CREATE DATABASE "${dbNameFromUrl}"`); // unsafe needed for dynamic identifier
            console.log(`Database '${dbNameFromUrl}' created successfully.`);
        } else {
            console.log(`Database '${dbNameFromUrl}' already exists.`);
        }
    } catch (error) {
        console.error('Error setting up database:', error);
    } finally {
        await adminSql.end();
    }
}

setupDatabase();
