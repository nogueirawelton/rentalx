import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { prisma } from "@shared/infra/prisma";

export class UsersRepository implements IUsersRepository {
  async create(data: ICreateUsersDTO): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  async updateAvatar(user_id: string, avatar_file: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        avatar: avatar_file,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .then((user) => user);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user
      .findUnique({
        where: {
          id,
        },
      })
      .then((user) => user);
    return user;
  }
}
