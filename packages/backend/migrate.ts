import 'dotenv/config';

import path from 'node:path';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';

const connectionString = process.env.DATABASE_URL;
const sql = neon(connectionString);
const db = drizzle(sql);

(async () => {
  await migrate(db, {
    migrationsFolder: path.resolve(__dirname, './drizzle/migrations'),
  });
})();
