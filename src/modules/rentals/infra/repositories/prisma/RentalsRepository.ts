import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { prisma } from "@shared/infra/prisma";

export class RentalsRepository implements IRentalsRepository {
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await prisma.rental.findFirst({
      where: {
        car_id,
        end_date: null,
      },
    });
    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await prisma.rental.findFirst({
      where: {
        user_id,
        end_date: null,
      },
    });
    return openByUser;
  }
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = await prisma.rental.create({
      data,
    });
    return rental;
  }
}
