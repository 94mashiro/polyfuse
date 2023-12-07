import { Inject, Injectable } from '@nestjs/common';

import { DrizzleAsyncProvider, DrizzleDB } from '@/modules/drizzle/drizzle.provider';
import { collections, subscriptionsToCollections } from '@/modules/drizzle/schema';

@Injectable()
export class CollectionService {
  constructor(@Inject(DrizzleAsyncProvider) private readonly db: DrizzleDB) {}

  listCollections() {
    return this.db.query.collections.findMany({
      with: {
        subscriptions: {
          columns: {},
          with: {
            subscription: true,
          },
        },
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
    // TODO: 加一个对 subIds 的校验
    await this.db.insert(subscriptionsToCollections).values(
      params.subIds.map(subId => ({
        collectionId: insertCollection[0].id,
        subscriptionId: subId,
      })),
    );
  }
}
