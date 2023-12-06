CREATE TABLE IF NOT EXISTS "subscriptions_to_collections" (
	"subscription_id" uuid NOT NULL,
	"collection_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "collection" DROP COLUMN IF EXISTS "sub_ids";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions_to_collections" ADD CONSTRAINT "subscriptions_to_collections_subscription_id_subscription_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions_to_collections" ADD CONSTRAINT "subscriptions_to_collections_collection_id_collection_id_fk" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
