import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("Should not be able to add a new specification to a non-existent car", async () => {
    const id = "12345";
    const specifications = ["54321"];

    await expect(
      createCarSpecificationUseCase.execute({
        id,
        specifications,
      })
    ).rejects.toEqual(new AppError("Car Not Exists!"));
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Example",
      description: "Description Example",
      daily_rate: 100,
      license_plate: "License Example",
      fine_amount: 60,
      brand: "Brand Example",
      category_id: "Category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "Example",
      description: "Description Example",
    });

    const specifications = [specification.id];

    const updatedCar = await createCarSpecificationUseCase.execute({
      id: car.id,
      specifications,
    });

    expect(updatedCar).toHaveProperty("specifications");
  });
});
