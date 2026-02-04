import postgres from 'postgres';
import * as dotenv from 'dotenv';
import path from 'path';

// Try to load from both locations to mimic Next.js
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function checkConnection() {
    const url = process.env.DATABASE_URL;

    console.log('\n--- Database Connection Diagnostic ---');
    console.log('Working Directory:', process.cwd());

    if (!url) {
        console.error('❌ ERROR: DATABASE_URL is not defined in process.env');
        console.log('   Please ensure .env or .env.local exists and contains DATABASE_URL');
        return;
    }

    // Mask password for safe logging
    const maskedUrl = url.replace(/:([^:@]+)@/, ':****@');
    console.log(`ℹ️  Using Connection String: ${maskedUrl}`);

    const sql = postgres(url, { connect_timeout: 5 });

    try {
        console.log('🔄 Attempting to connect...');
        const result = await sql`SELECT 1 as "connected"`;
        console.log('✅ SUCCESS: Connected to database!');
        console.log('   Database version:', (await sql`SHOW server_version`)[0].server_version);

        const usersCount = await sql`SELECT COUNT(*) FROM users`;
        console.log('   Users in DB:', usersCount[0].count);
        const usersList = await sql`SELECT email, name FROM users LIMIT 5`;
        console.log('   Recent Users:', usersList);
    } catch (err: any) {
        console.error('❌ CONNECTION FAILED');
        console.error('   Error Code:', err.code);
        console.error('   Message:', err.message);
        if (err.code === 'ECONNREFUSED') {
            console.log('\n   Possible causes:');
            console.log('   1. Postgres is not running.');
            console.log('   2. You are connecting to the wrong port (Verified: ' + new URL(url).port + ')');
        } else if (err.code === '28P01') {
            console.log('\n   Possible causes:');
            console.log('   1. Incorrect Password or Username.');
        }
    } finally {
        await sql.end();
    }
    console.log('--------------------------------------\n');
}

checkConnection();
