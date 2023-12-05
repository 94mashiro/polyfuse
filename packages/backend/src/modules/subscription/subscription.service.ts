import { Inject, Injectable } from '@nestjs/common';

import { DrizzleAsyncProvider, DrizzleDB } from '../drizzle/drizzle.provider';

@Injectable()
export class SubscriptionService {
  constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDB) {}
}
