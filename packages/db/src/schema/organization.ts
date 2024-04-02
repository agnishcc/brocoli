import { pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';


/**
 * @description organizations table schema
 */
export const organtizations = pgTable('Organizations', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    website: varchar('website', { length: 256 }),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
}, (organtizations) => {
    return {
        nameIndex: uniqueIndex('name_idx').on(organtizations.name),
    }
});


/** 
 * @description infer types for organizations
 */
export type Organizations = typeof organtizations.$inferSelect;
export type NewOrganizations = typeof organtizations.$inferInsert