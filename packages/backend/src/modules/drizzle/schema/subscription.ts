import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const subscriptions = pgTable('subscription', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').default(''),
  url: text('url').default(''),
  userAgent: text('user_agent').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Subscription = typeof subscriptions.$inferSelect;
