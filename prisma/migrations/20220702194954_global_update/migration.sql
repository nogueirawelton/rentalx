/*
  Warnings:

  - You are about to drop the `SpecifcationsOnCars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SpecifcationsOnCars" DROP CONSTRAINT "SpecifcationsOnCars_car_id_fkey";

-- DropForeignKey
ALTER TABLE "SpecifcationsOnCars" DROP CONSTRAINT "SpecifcationsOnCars_specification_id_fkey";

-- DropTable
DROP TABLE "SpecifcationsOnCars";

-- CreateTable
CREATE TABLE "_CarToSpecification" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CarToSpecification_AB_unique" ON "_CarToSpecification"("A", "B");

-- CreateIndex
CREATE INDEX "_CarToSpecification_B_index" ON "_CarToSpecification"("B");

-- AddForeignKey
ALTER TABLE "_CarToSpecification" ADD CONSTRAINT "_CarToSpecification_A_fkey" FOREIGN KEY ("A") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToSpecification" ADD CONSTRAINT "_CarToSpecification_B_fkey" FOREIGN KEY ("B") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
