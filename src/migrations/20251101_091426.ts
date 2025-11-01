import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "branding_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "branding_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "branding_settings_socials" ADD CONSTRAINT "branding_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."branding_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "branding_settings_socials_order_idx" ON "branding_settings_socials" USING btree ("_order");
  CREATE INDEX "branding_settings_socials_parent_id_idx" ON "branding_settings_socials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "branding_settings_socials" CASCADE;
  DROP TABLE "branding_settings" CASCADE;`)
}
