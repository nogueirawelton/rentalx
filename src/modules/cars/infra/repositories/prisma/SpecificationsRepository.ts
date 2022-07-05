import { Specification } from "@modules/cars/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { prisma } from "@shared/infra/prisma";

export class SpecificationsRepository implements ISpecificationsRepository {
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await prisma.specification.create({
      data: {
        name,
        description,
      },
    });
    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await prisma.specification
      .findFirst({
        where: {
          name,
        },
      })
      .then((specification) => specification);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await prisma.specification
      .findMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      .then((specification) => specification);
    return specification;
  }
}
