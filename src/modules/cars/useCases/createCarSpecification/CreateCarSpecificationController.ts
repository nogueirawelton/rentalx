import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarsSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications } = request.body;
    const createCarSpecificationsUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationsUseCase.execute({
      id,
      specifications,
    });
    return response.status(201).json(car);
  }
}
