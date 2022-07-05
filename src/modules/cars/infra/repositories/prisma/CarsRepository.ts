import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";
import { CarsSpecifications } from "@modules/cars/entities/CarSpecifications";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { prisma } from "@shared/infra/prisma";

export class CarsRepository implements ICarsRepository {
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = await prisma.car.create({
      data,
    });
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await prisma.car.findUnique({
      where: {
        license_plate,
      },
    });
    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = await prisma.car.findMany({
      where: {
        available: true,
        ...(brand && { brand }),
        ...(category_id && { category_id }),
        ...(name && { name }),
      },
      include: {
        specifications: true,
        car_images: true,
      },
    });
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = prisma.car.findUnique({
      where: {
        id,
      },
    });
    return car;
  }

  async updateSpecifications({
    id,
    specifications,
  }: CarsSpecifications): Promise<Car> {
    const car = await prisma.car.update({
      where: {
        id,
      },
      include: {
        specifications: true,
      },
      data: {
        specifications: {
          set: [],
          connect: specifications.map((specification) => {
            return {
              id: specification.id,
            };
          }),
        },
      },
    });
    return car;
  }
  async updateAvailable(id: string, available: boolean): Promise<Car> {
    const car = await prisma.car.update({
      where: {
        id,
      },
      data: {
        available,
      },
    });
    return car;
  }
}
