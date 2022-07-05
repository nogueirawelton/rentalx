import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create Specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory
    );
  });
  it("Should be able to create a new specification", async () => {
    const specification = await createSpecificationUseCase.execute({
      name: "Example Name",
      description: "Description Example",
    });
    expect(specification).toHaveProperty("id");
  });
  it("Should not be able to create a existent specification", async () => {
    await createSpecificationUseCase.execute({
      name: "Example Name",
      description: "Description Example",
    });

    await expect(
      createSpecificationUseCase.execute({
        name: "Example Name",
        description: "Description Example",
      })
    ).rejects.toEqual(new AppError("Specification Already Exists!"));
  });
});
