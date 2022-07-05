import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  specifications: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ id, specifications }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(id);

    if (!carExists) {
      throw new AppError("Car Not Exists!");
    }

    const findedSpecifications = await this.specificationsRepository.findByIds(
      specifications
    );

    const car = await this.carsRepository.updateSpecifications({
      id,
      specifications: findedSpecifications,
    });
    return car;
  }
}
