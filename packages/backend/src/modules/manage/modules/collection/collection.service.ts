import { Inject, Injectable } from '@nestjs/common';

import { DrizzleAsyncProvider, DrizzleDB } from '@/modules/drizzle/drizzle.provider';

@Injectable()
export class CollectionService {
  constructor(@Inject(DrizzleAsyncProvider) private readonly db: DrizzleDB) {}
}
