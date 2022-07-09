import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/repositories/prisma/UsersRepository";
import { UserTokensRepository } from "@modules/accounts/infra/repositories/prisma/UserTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { CarsImagesRepository } from "@modules/cars/infra/repositories/prisma/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/repositories/prisma/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/repositories/prisma/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/repositories/prisma/SpecificationsRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/repositories/prisma/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
