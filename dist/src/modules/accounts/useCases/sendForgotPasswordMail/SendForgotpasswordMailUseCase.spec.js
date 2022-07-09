"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const UserTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const MailProviderInMemory_1 = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
const AppError_1 = require("@shared/errors/AppError");
const SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let userTokensRepositoryInMemory;
let dateProvider;
let mailProviderInMemory;
describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory_1.UserTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        mailProviderInMemory = new MailProviderInMemory_1.MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider, mailProviderInMemory);
    });
    it("Should be able to send a forgot password mail to user", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
        const user = yield usersRepositoryInMemory.create({
            name: "Name Example",
            email: "email@example.com",
            password: "1234",
            driver_license: "12345",
        });
        yield sendForgotPasswordMailUseCase.execute(user.email);
        expect(sendMail).toHaveBeenCalled();
    }));
    it("Should not be able to send an email to a non-existent user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute("email@example.com")).rejects.toEqual(new AppError_1.AppError("User Does Not Exists!"));
    }));
    it("Should be able to create an user token", () => __awaiter(void 0, void 0, void 0, function* () {
        const generateTokenMail = jest.spyOn(userTokensRepositoryInMemory, "create");
        const user = yield usersRepositoryInMemory.create({
            name: "Name Example",
            email: "email@example.com",
            password: "1234",
            driver_license: "12345",
        });
        yield sendForgotPasswordMailUseCase.execute(user.email);
        expect(generateTokenMail).toHaveBeenCalled();
    }));
});
