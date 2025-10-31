import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "theme_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"primary_color" varchar,
  	"secondary_color" varchar,
  	"accent_color" varchar,
  	"background_color" varchar,
  	"text_color" varchar,
  	"primary_text_color" varchar,
  	"secondary_text_color" varchar,
  	"border_radius" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "theme_settings" CASCADE;`)
}
