import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';

import { collections } from './collection';
import { subscriptions } from './subscription';

export const subscriptionsToCollections = pgTable('subscriptions_to_collections', {
  subscriptionId: uuid('subscription_id')
    .notNull()
    .references(() => subscriptions.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  collectionId: uuid('collection_id')
    .notNull()
    .references(() => collections.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export const subscriptionsToCollectionsRelations = relations(subscriptionsToCollections, ({ one }) => ({
  subscription: one(subscriptions, {
    fields: [subscriptionsToCollections.subscriptionId],
    references: [subscriptions.id],
  }),
  collection: one(collections, {
    fields: [subscriptionsToCollections.collectionId],
    references: [collections.id],
  }),
}));
