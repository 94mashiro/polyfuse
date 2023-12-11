import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleAsyncProvider, DrizzleDB } from '../../../drizzle/drizzle.provider';
import { collections, subscriptionsToCollections } from '../../../drizzle/schema';

@Injectable()
export class CollectionService {
  constructor(@Inject(DrizzleAsyncProvider) private readonly db: DrizzleDB) {}

  getCollectionById(params: { id: string }) {
    return this.db.query.collections.findFirst({
      where: (collection, { eq }) => eq(collection.id, params.id),
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

  async updateCollection(params: { id: string; name: string; subIds: string[] }) {
    await this.db.transaction(async db => {
      await db.update(collections).set({ name: params.name }).where(eq(collections.id, params.id));
      await db.delete(subscriptionsToCollections).where(eq(subscriptionsToCollections.collectionId, params.id));
      await db.insert(subscriptionsToCollections).values(
        params.subIds.map(subId => ({
          collectionId: params.id,
          subscriptionId: subId,
        })),
      );
    });
  }

  async deleteCollection(params: { id: string }) {
    await this.db.transaction(async db => {
      await db.delete(subscriptionsToCollections).where(eq(subscriptionsToCollections.collectionId, params.id));
      await db.delete(collections).where(eq(collections.id, params.id));
    });
  }
}
