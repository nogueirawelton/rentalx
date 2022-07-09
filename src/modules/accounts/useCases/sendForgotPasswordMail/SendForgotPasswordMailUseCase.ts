import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views/emails/forgotPassword.hbs"
    );

    if (!user) {
      throw new AppError("User Does Not Exists!");
    }

    const token = uuidv4();

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dateProvider.addHours(3),
    });

    const variables = {
      name: user.name,
      link: `${process.env.APP_API_URL}/password/reset?token=${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}
