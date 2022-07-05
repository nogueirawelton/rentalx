import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Example",
      description: "Description Example",
      daily_rate: 100,
      license_plate: "License Example",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "Category",
    });
    expect(car).toHaveProperty("id");
  });
  it("Should not be able to create a car with exists license plate", async () => {
    const car = {
      name: "Name Example",
      description: "Description Example",
      daily_rate: 100,
      license_plate: "License Example",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "Category",
    };

    await createCarUseCase.execute(car);
    await expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError("Car Already Exists!")
    );
  });
  it("Should be able to create a car with availale true default", async () => {
    const car = {
      name: "Name Example",
      description: "Description Example",
      daily_rate: 100,
      license_plate: "License Example",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "Category",
    };
    await createCarUseCase.execute(car);
    const carCreated = await carsRepositoryInMemory.findByLicensePlate(
      car.license_plate
    );
    expect(carCreated.available).toBe(true);
  });
});
