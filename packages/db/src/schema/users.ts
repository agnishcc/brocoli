import { integer, pgEnum, pgTable, serial, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { organtizations } from './organization';
import { apps } from './app';

/**
 * @description user roles
 */
export const userRoles = pgEnum('UserRoles', ['OWNER', 'VIEWER', 'EDITOR']);

/**
 * @description users table schema
 */
export const users = pgTable('Users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 256 }),
    firstName: varchar('firstName', { length: 256 }),
    lastName: varchar('lastName', { length: 256 }),
    organizationId: integer('organization_id').references(() => organtizations.id),
    role: userRoles('UserRoles'),
    lastLogin: timestamp('lastLogin', { withTimezone: true }),
}, (users) => {
    return {
        emailIndex: uniqueIndex('email_idx').on(users.email),
    }
});

/**
 * @description infer types for users
 */
export type Users = typeof users.$inferSelect;
export type NewUsers = typeof users.$inferInsert;


/**
 * @description user app scope table schema
 * @description this table is used to define the scope of a user in an app
 */
export const userAppScope = pgTable('UserAppScope', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    appId: integer('app_id').references(() => apps.id),
}, (userAppScope) => {
    return {
        userAppIndex: uniqueIndex('user_app_idx').on(userAppScope.userId, userAppScope.appId),
    }
});

/**
 * @description infer types for user app scope
 */
export type UserAppScope = typeof userAppScope.$inferSelect;
export type NewUserAppScope = typeof userAppScope.$inferInsert;