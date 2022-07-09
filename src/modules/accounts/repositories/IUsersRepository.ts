import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";

export interface IUsersRepository {
  create(data: ICreateUsersDTO): Promise<User>;
  updateAvatar(user_id: string, avatar_file: string): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  updatePassword(id: string, newPass: string): Promise<void>;
}
