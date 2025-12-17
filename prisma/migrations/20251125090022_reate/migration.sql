/*
  Warnings:

  - Added the required column `costPrice` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketPrice` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "costPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "marketPrice" DOUBLE PRECISION NOT NULL;
