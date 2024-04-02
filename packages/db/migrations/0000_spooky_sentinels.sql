DO $$ BEGIN
 CREATE TYPE "UserRoles" AS ENUM('OWNER', 'VIEWER', 'EDITOR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ApiKeys" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(256),
	"name" varchar(256),
	"description" varchar(256),
	"app_id" integer,
	"organization_id" integer,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Apps" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"organization_id" integer,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "EventTemplates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" varchar(256),
	"content" jsonb,
	"createdAt" timestamp with time zone DEFAULT now(),
	"app_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Events" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" jsonb,
	"event_template_id" integer,
	"content_display" varchar(256),
	"userData" jsonb,
	"metadata" jsonb,
	"timestamp" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now(),
	"app_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Organizations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"website" varchar(256),
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserAppScope" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"app_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"firstName" varchar(256),
	"lastName" varchar(256),
	"organization_id" integer,
	"UserRoles" "UserRoles",
	"lastLogin" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "api_key_idx" ON "ApiKeys" ("key");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "app_name_idx" ON "Apps" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "event_name_idx" ON "EventTemplates" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "org_name_idx" ON "Organizations" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_app_idx" ON "UserAppScope" ("user_id","app_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "Users" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ApiKeys" ADD CONSTRAINT "ApiKeys_app_id_Apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "Apps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ApiKeys" ADD CONSTRAINT "ApiKeys_organization_id_Organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Apps" ADD CONSTRAINT "Apps_organization_id_Organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "EventTemplates" ADD CONSTRAINT "EventTemplates_app_id_Apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "Apps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Events" ADD CONSTRAINT "Events_event_template_id_EventTemplates_id_fk" FOREIGN KEY ("event_template_id") REFERENCES "EventTemplates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Events" ADD CONSTRAINT "Events_app_id_Apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "Apps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserAppScope" ADD CONSTRAINT "UserAppScope_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserAppScope" ADD CONSTRAINT "UserAppScope_app_id_Apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "Apps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Users" ADD CONSTRAINT "Users_organization_id_Organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
