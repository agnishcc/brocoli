import { integer, jsonb, pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { apps } from './app';


export const eventTemplates = pgTable('EventTemplates', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    description: varchar('description', { length: 256 }),
    content: jsonb('content'),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
    appId: integer('app_id').references(() => apps.id),
}, (eventTemplates) => {
    return {
        nameIndex: uniqueIndex('event_name_idx').on(eventTemplates.name),
    }
});

export type EventTemplates = typeof eventTemplates.$inferSelect;
export type NewEventTemplates = typeof eventTemplates.$inferInsert;

export const events = pgTable('Events', {
    id: serial('id').primaryKey(),
    eventContent: jsonb('content'),
    eventTemplateId: integer('event_template_id').references(() => eventTemplates.id),
    contentDisplay: varchar('content_display', { length: 256 }),
    userData: jsonb('userData'),
    metadata: jsonb('metadata'),
    timestamp: timestamp('timestamp', { withTimezone: true }),
    createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
    appId: integer('app_id').references(() => apps.id),
});

export type Events = typeof events.$inferSelect;
export type NewEvents = typeof events.$inferInsert;