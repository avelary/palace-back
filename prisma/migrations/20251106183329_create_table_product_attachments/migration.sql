/*
  Warnings:

  - You are about to drop the column `attachments` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "attachments";

-- CreateTable
CREATE TABLE "ProductAttachment" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ProductAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttachment_id_key" ON "ProductAttachment"("id");

-- AddForeignKey
ALTER TABLE "ProductAttachment" ADD CONSTRAINT "ProductAttachment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
