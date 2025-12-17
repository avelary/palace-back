/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "image",
ADD COLUMN     "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[];
