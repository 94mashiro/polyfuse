import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { subscriptionsToCollections } from './subscriptions-collections';

export const collections = pgTable('collection', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Collection = typeof collections.$inferSelect;

export const collectionsRelations = relations(collections, ({ many }) => ({
  subscriptionsToCollections: many(subscriptionsToCollections),
}));
