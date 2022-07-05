import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
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

  it("Should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      await createUserUseCase.execute({
        driver_license: "12345",
        email: "user@test.com",
        password: "1234",
        name: "User Test",
      });

      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
