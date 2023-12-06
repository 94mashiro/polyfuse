import { Inject, Injectable } from '@nestjs/common';

import { DrizzleAsyncProvider, DrizzleDB } from '@/modules/drizzle/drizzle.provider';
import { collections, subscriptionsToCollections } from '@/modules/drizzle/schema';

@Injectable()
export class CollectionService {
  constructor(@Inject(DrizzleAsyncProvider) private readonly db: DrizzleDB) {}

  listCollections() {
    return this.db.query.collections.findMany({
      with: {
        subscriptions: true,
      },
    });
  }

  async createCollection(params: { name: string; subIds: string[] }) {
    const insertCollection = await this.db
      .insert(collections)
      .values({
        name: params.name,
      })
      .returning();
    await this.db.insert(subscriptionsToCollections).values(
      params.subIds.map(subId => ({
        collectionId: insertCollection[0].id,
        subscriptionId: subId,
      })),
    );
  }
}
