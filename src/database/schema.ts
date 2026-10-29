import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const entries = pgTable('entries', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  title: varchar({ length: 200 }).notNull(),

  content: text().notNull(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
});