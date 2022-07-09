import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/entities/UserToken";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { prisma } from "@shared/infra/prisma";

export class UserTokensRepository implements IUserTokensRepository {
  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = await prisma.userToken.create({
      data: {
        user_id,
        refresh_token,
        expires_date,
      },
    });
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        user_id,
        refresh_token,
      },
    });
    return userToken;
  }

  async deleteById(id: string) {
    await prisma.userToken.delete({
      where: {
        id,
      },
    });
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        refresh_token,
      },
    });
    return userToken;
  }
}
