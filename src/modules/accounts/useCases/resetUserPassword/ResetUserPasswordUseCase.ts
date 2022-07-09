import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}
@injectable()
export class ResetUserPasswordUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest) {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token Invalid!");
    }

    if (this.dateProvider.compareIfBefore(userToken.expires_date, new Date())) {
      throw new AppError("Token Expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    const passwordMatch = await compare(password, user.password);

    if (passwordMatch) {
      throw new AppError(
        "The New Password Cannot be The Same as The Previous One!"
      );
    }

    const newPassword = await hash(password, 8);

    this.usersRepository.updatePassword(userToken.user_id, newPassword);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
