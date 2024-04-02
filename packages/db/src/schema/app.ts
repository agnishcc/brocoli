import { integer, timestamp, pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { organtizations } from './organization';


/**
 * @description apps table schema
 */

export const apps = pgTable('Apps', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    organizationId: integer('organization_id').references(() => organtizations.id),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
}, (apps) => {
    return {
        nameIndex: uniqueIndex('name_idx').on(apps.name),
    }
});

/**
 * @description apiKeys table schema
 */
export const apiKeys = pgTable('ApiKeys', {
    id: serial('id').primaryKey(),
    key: varchar('key', { length: 256 }),
    name: varchar('name', { length: 256 }),
    description: varchar('description', { length: 256 }),
    appId: integer('app_id').references(() => apps.id),
    organizationId: integer('organization_id').references(() => organtizations.id),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
}, (apiKeys) => {
    return {
        keyIndex: uniqueIndex('key_idx').on(apiKeys.key),
    }
});


/** 
 * @description infer types for apps and apiKeys
 */
export type Apps = typeof apps.$inferSelect;
export type NewApps = typeof apps.$inferInsert;

export type ApiKeys = typeof apiKeys.$inferSelect;
export type NewApiKeys = typeof apiKeys.$inferInsert;
