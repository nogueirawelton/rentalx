/*
  Warnings:

  - You are about to drop the `_CarToSpecification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CarToSpecification" DROP CONSTRAINT "_CarToSpecification_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarToSpecification" DROP CONSTRAINT "_CarToSpecification_B_fkey";

-- DropTable
DROP TABLE "_CarToSpecification";

-- CreateTable
CREATE TABLE "SpecifcationsOnCars" (
    "car_id" TEXT NOT NULL,
    "specification_id" TEXT NOT NULL,

    CONSTRAINT "SpecifcationsOnCars_pkey" PRIMARY KEY ("car_id","specification_id")
);

-- AddForeignKey
ALTER TABLE "SpecifcationsOnCars" ADD CONSTRAINT "SpecifcationsOnCars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecifcationsOnCars" ADD CONSTRAINT "SpecifcationsOnCars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
