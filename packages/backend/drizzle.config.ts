import 'dotenv/config';

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/modules/drizzle/schema/index.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
