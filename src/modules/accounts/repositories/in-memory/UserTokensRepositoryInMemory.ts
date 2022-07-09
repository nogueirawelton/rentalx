import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/entities/UserToken";

import { IUserTokensRepository } from "../IUserTokensRepository";

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  userTokens: UserToken[] = [];
  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );
    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (ut) => ut.refresh_token === refresh_token
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const updatedUserTokens = this.userTokens.filter((ut) => ut.id !== id);
    this.userTokens = updatedUserTokens;
  }
}
