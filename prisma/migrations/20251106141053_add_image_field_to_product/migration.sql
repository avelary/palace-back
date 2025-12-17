-- AlterTable
ALTER TABLE "products" ADD COLUMN     "image" TEXT[] DEFAULT ARRAY[]::TEXT[];
