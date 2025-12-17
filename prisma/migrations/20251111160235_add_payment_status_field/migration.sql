/*
  Warnings:

  - Added the required column `status` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'cancel', 'completed');

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "status" "PaymentStatus" NOT NULL;
