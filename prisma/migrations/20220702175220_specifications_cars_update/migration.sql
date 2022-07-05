/*
  Warnings:

  - You are about to drop the `specifications_cars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "specifications_cars" DROP CONSTRAINT "specifications_cars_car_id_fkey";

-- DropForeignKey
ALTER TABLE "specifications_cars" DROP CONSTRAINT "specifications_cars_specification_id_fkey";

-- DropTable
DROP TABLE "specifications_cars";

-- CreateTable
CREATE TABLE "SpecificationsCars" (
    "specification_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpecificationsCars_pkey" PRIMARY KEY ("specification_id","car_id")
);

-- AddForeignKey
ALTER TABLE "SpecificationsCars" ADD CONSTRAINT "SpecificationsCars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "SpecificationsCars" ADD CONSTRAINT "SpecificationsCars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;
