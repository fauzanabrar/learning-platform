import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    username: text('username').notNull().unique(),
    email: text('email'), // Optional email
    password: text('password').notNull(),
    name: text('name'),
    avatarUrl: text('avatar_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
