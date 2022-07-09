"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ResetUserPasswordUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("@shared/errors/AppError");
let ResetUserPasswordUseCase = class ResetUserPasswordUseCase {
    constructor(userTokensRepository, dateProvider, usersRepository) {
        this.userTokensRepository = userTokensRepository;
        this.dateProvider = dateProvider;
        this.usersRepository = usersRepository;
    }
    execute({ token, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield this.userTokensRepository.findByRefreshToken(token);
            if (!userToken) {
                throw new AppError_1.AppError("Token Invalid!");
            }
            if (this.dateProvider.compareIfBefore(userToken.expires_date, new Date())) {
                throw new AppError_1.AppError("Token Expired");
            }
            const user = yield this.usersRepository.findById(userToken.user_id);
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password);
            if (passwordMatch) {
                throw new AppError_1.AppError("The New Password Cannot be The Same as The Previous One!");
            }
            const newPassword = yield (0, bcryptjs_1.hash)(password, 8);
            this.usersRepository.updatePassword(userToken.user_id, newPassword);
            yield this.userTokensRepository.deleteById(userToken.id);
        });
    }
};
ResetUserPasswordUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserTokensRepository")),
    __param(1, (0, tsyringe_1.inject)("DayjsDateProvider")),
    __param(2, (0, tsyringe_1.inject)("UsersRepository")),
    __metadata("design:paramtypes", [Object, Object, Object])
], ResetUserPasswordUseCase);
exports.ResetUserPasswordUseCase = ResetUserPasswordUseCase;
