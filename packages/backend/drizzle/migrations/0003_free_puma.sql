ALTER TABLE "subscriptions_to_collections" DROP CONSTRAINT "subscriptions_to_collections_subscription_id_subscription_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions_to_collections" ADD CONSTRAINT "subscriptions_to_collections_subscription_id_subscription_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "subscription"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
