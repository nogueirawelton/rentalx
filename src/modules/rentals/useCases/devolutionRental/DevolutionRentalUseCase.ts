import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minDaily = 1;
    if (!rental) {
      throw new AppError("Rental Does Not Exists!");
    }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      new Date()
    );

    const daily =
      this.dateProvider.compareInDays(rental.start_date, new Date()) ||
      minDaily;

    let total = 0;
    if (delay > 0) {
      total += delay * car.fine_amount;
    }

    total += daily * car.daily_rate;

    const updatedRental = await this.rentalsRepository.closeRental(id, total);
    await this.carsRepository.updateAvailable(car.id, true);

    return updatedRental;
  }
}
