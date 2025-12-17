/*
  Warnings:

  - You are about to drop the `ProductAttachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ProductAttachment" DROP CONSTRAINT "ProductAttachment_product_id_fkey";

-- DropTable
DROP TABLE "public"."ProductAttachment";

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attachments_id_key" ON "attachments"("id");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
