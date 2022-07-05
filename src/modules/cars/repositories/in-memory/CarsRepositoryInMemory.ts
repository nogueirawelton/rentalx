import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/entities/Car";
import { CarsSpecifications } from "@modules/cars/entities/CarSpecifications";

import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const availableCars = this.cars.filter((car) => car.available);
    let filtredCars: Car[];

    if (brand || category_id || name) {
      filtredCars = availableCars.filter((car) => {
        if (
          car.brand === brand ||
          car.category_id === category_id ||
          car.name === name
        ) {
          return car;
        }
        return null;
      });
      return filtredCars;
    }
    return availableCars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateSpecifications({
    id,
    specifications,
  }: CarsSpecifications): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    car.specifications = specifications;
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);
    car.available = available;

    return car;
  }
}
