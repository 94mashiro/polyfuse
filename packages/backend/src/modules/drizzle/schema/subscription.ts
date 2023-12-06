import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { subscriptionsToCollections } from './subscriptions-collections';

export const subscriptions = pgTable('subscription', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').default(''),
  url: text('url').default(''),
  userAgent: text('user_agent').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Subscription = typeof subscriptions.$inferSelect;

export const subscriptionsRelations = relations(subscriptions, ({ many }) => ({
  collections: many(subscriptionsToCollections),
}));
