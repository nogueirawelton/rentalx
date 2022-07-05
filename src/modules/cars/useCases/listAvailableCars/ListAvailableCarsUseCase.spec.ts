import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("Should be able to list all available cars", async () => {
    carsRepositoryInMemory.create({
      name: "Example 3",
      description: "Description Example",
      daily_rate: 110.0,
      license_plate: "ZPK-4321",
      fine_amount: 40.0,
      brand: "Audi",
      category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
    });

    carsRepositoryInMemory.create({
      name: "Example 2",
      description: "Description Example",
      daily_rate: 110.0,
      license_plate: "ZPK-4321",
      fine_amount: 40.0,
      brand: "BrandExample2",
      category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toHaveLength(2);
  });
  it("Should be able to list all available cars by brand", async () => {
    carsRepositoryInMemory.create({
      name: "Example 1",
      description: "Description Example",
      daily_rate: 110.0,
      license_plate: "ZPK-4321",
      fine_amount: 40.0,
      brand: "BrandExample",
      category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
    });

    const cars = await listCarsUseCase.execute({
      brand: "BrandExample",
    });
    expect(cars).toHaveLength(1);
  });
  it("Should be able to list all available cars by name", async () => {
    carsRepositoryInMemory.create({
      name: "Example 1",
      description: "Description Example",
      daily_rate: 110.0,
      license_plate: "ZPK-4321",
      fine_amount: 40.0,
      brand: "BrandExample",
      category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
    });

    const cars = await listCarsUseCase.execute({
      name: "Example 1",
    });
    expect(cars).toHaveLength(1);
  });
  it("Should be able to list all available cars by category", async () => {
    carsRepositoryInMemory.create({
      name: "Example 1",
      description: "Description Example",
      daily_rate: 110.0,
      license_plate: "ZPK-4321",
      fine_amount: 40.0,
      brand: "BrandExample",
      category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
    });
    expect(cars).toHaveLength(1);
  });
});
