import { neon, neonConfig } from '@neondatabase/serverless';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/neon-http';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './schema';

export const DrizzleAsyncProvider = Symbol('DrizzleAsyncProvider');

export type DrizzleDB = NodePgDatabase<typeof schema>;

export const DrizzleProvider = {
  provide: DrizzleAsyncProvider,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    neonConfig.fetchConnectionCache = true;
    const sql = neon(configService.get<string>('DATABASE_URL'));
    const db = drizzle(sql);
    return db;
  },
};
