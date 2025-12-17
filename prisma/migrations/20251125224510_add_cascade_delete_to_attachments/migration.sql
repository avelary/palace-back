-- DropForeignKey
ALTER TABLE "public"."attachments" DROP CONSTRAINT "attachments_product_id_fkey";

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
