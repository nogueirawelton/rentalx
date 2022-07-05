/*
  Warnings:

  - You are about to drop the `CarImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarImages" DROP CONSTRAINT "CarImages_carId_fkey";

-- DropTable
DROP TABLE "CarImages";

-- CreateTable
CREATE TABLE "cars_images" (
    "id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars_images" ADD CONSTRAINT "cars_images_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
