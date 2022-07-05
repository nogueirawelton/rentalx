import { CarImage } from "@modules/cars/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { prisma } from "@shared/infra/prisma";

export class CarsImagesRepository implements ICarsImagesRepository {
  async create(id: string, image_name: string): Promise<CarImage> {
    const carImage = await prisma.carImage.create({
      data: {
        image_name,
        car_id: id,
      },
    });
    return carImage;
  }
}
