import 'dotenv/config';

import path from 'node:path';

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

(async () => {
  const connectionString = process.env.DATABASE_URL;
  const sql = new Pool({
    connectionString,
  });
  const db = drizzle(sql);
  await migrate(db, {
    migrationsFolder: path.resolve(__dirname, './drizzle/migrations'),
  });
})();
