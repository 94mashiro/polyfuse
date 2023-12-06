import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const collections = pgTable('collection', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').default(''),
  subIds: text('sub_ids').default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Collection = typeof collections.$inferSelect;
