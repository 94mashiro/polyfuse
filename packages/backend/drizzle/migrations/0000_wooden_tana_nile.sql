CREATE TABLE IF NOT EXISTS "subscription" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text DEFAULT '',
	"url" text DEFAULT '',
	"user_agent" text DEFAULT '',
	"created_at" timestamp DEFAULT now()
);
