import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(sub, token);

    if (!userToken) {
      throw new AppError("Refresh Token Does Not Exists!");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_resfresh_token,
    });

    await this.userTokensRepository.create({
      expires_date: this.dateProvider.addDays(auth.expires_refresh_token_days),
      refresh_token,
      user_id: sub,
    });

    const newToken = sign({ email }, auth.secret_token, {
      subject: sub,
      expiresIn: auth.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
