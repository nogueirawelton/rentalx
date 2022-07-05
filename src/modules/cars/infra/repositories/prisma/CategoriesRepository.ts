import { Category } from "@modules/cars/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";
import { prisma } from "@shared/infra/prisma";

export class CategoriesRepository implements ICategoriesRepository {
  async create({ name, description }: ICreateCategoryDTO) {
    const category = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await prisma.category
      .findFirst({
        where: {
          name,
        },
      })
      .then((category) => category);
    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await prisma.category
      .findMany({})
      .then((categories) => categories);
    return categories;
  }
}
