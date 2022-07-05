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

  async findById(id: string): Promise<Rental> {
    const rental = await prisma.rental.findUnique({
      where: {
        id,
      },
    });
    return rental;
  }

  async closeRental(id: string, total: number): Promise<Rental> {
    const rental = await prisma.rental.update({
      where: {
        id,
      },
      data: {
        total,
        end_date: new Date(),
        updatedAt: new Date(),
      },
    });
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await prisma.rental.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        start_date: true,
        end_date: true,
        expected_return_date: true,
        total: true,
        createdAt: true,
        updatedAt: true,
        user_id: true,
        car: true,
      },
    });
    return rentals;
  }
}
