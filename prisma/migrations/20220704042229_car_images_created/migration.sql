/*
  Warnings:

  - You are about to drop the column `carId` on the `cars_images` table. All the data in the column will be lost.
  - Added the required column `car_id` to the `cars_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cars_images" DROP CONSTRAINT "cars_images_carId_fkey";

-- AlterTable
ALTER TABLE "cars_images" DROP COLUMN "carId",
ADD COLUMN     "car_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "cars_images" ADD CONSTRAINT "cars_images_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
