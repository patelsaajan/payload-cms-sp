import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_timeline_orientation" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_orientation" AS ENUM('vertical', 'horizontal');
  ALTER TABLE "pages_blocks_timeline" ADD COLUMN "orientation" "enum_pages_blocks_timeline_orientation";
  ALTER TABLE "_pages_v_blocks_timeline" ADD COLUMN "orientation" "enum__pages_v_blocks_timeline_orientation";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_timeline" DROP COLUMN "orientation";
  ALTER TABLE "_pages_v_blocks_timeline" DROP COLUMN "orientation";
  DROP TYPE "public"."enum_pages_blocks_timeline_orientation";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_orientation";`)
}
