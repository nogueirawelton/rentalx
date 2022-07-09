import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });
  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    const user = await usersRepositoryInMemory.create({
      name: "Name Example",
      email: "email@example.com",
      password: "1234",
      driver_license: "12345",
    });

    await sendForgotPasswordMailUseCase.execute(user.email);
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send an email to a non-existent user", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("email@example.com")
    ).rejects.toEqual(new AppError("User Does Not Exists!"));
  });
  it("Should be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(
      userTokensRepositoryInMemory,
      "create"
    );

    const user = await usersRepositoryInMemory.create({
      name: "Name Example",
      email: "email@example.com",
      password: "1234",
      driver_license: "12345",
    });

    await sendForgotPasswordMailUseCase.execute(user.email);
    expect(generateTokenMail).toHaveBeenCalled();
  });
});
