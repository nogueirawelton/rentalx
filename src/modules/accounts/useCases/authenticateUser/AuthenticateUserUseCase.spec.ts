import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able to authenticate an User", async () => {
    const user = await createUserUseCase.execute({
      driver_license: "12345",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    });

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: user.email,
      password: "1234",
    });

    expect(authenticatedUser).toHaveProperty("token");
  });

  it("Should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or Password Incorrect!"));
  });
  it("Should not be able to authenticate with incorrect password", async () => {
    await createUserUseCase.execute({
      driver_license: "12345",
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    });

    await expect(
      authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "incorrectPassword",
      })
    ).rejects.toEqual(new AppError("Email or Password Incorrect!"));
  });
});
