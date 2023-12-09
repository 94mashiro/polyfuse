import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

export const DrizzleAsyncProvider = Symbol('DrizzleAsyncProvider');

export type DrizzleDB = NodePgDatabase<typeof schema>;

export const DrizzleProvider = {
  provide: DrizzleAsyncProvider,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const sql = new Pool({
      connectionString: configService.get<string>('DATABASE_URL'),
    });
    return drizzle(sql, { schema });
  },
};
