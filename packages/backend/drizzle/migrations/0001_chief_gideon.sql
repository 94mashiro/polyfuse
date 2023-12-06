CREATE TABLE IF NOT EXISTS "collection" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text DEFAULT '',
	"sub_ids" text DEFAULT '',
	"created_at" timestamp DEFAULT now()
);
