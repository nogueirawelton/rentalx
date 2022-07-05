-- CreateTable
CREATE TABLE "CarImages" (
    "id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarImages" ADD CONSTRAINT "CarImages_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
