/*
  Warnings:

  - You are about to drop the column `start_data` on the `rentals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rentals" DROP COLUMN "start_data",
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "end_date" DROP NOT NULL;
