import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);
    this.users.push(user);

    return user;
  }
  async updateAvatar(user_id: string, avatar_file: string): Promise<void> {
    const user = this.users.find((user) => user.id === user_id);
    user.avatar = avatar_file;
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
}
