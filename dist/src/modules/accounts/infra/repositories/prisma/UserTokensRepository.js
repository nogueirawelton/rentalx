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
exports.UserTokensRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
class UserTokensRepository {
    create({ user_id, refresh_token, expires_date, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield prisma_1.prisma.userToken.create({
                data: {
                    user_id,
                    refresh_token,
                    expires_date,
                },
            });
            return userToken;
        });
    }
    findByUserIdAndRefreshToken(user_id, refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield prisma_1.prisma.userToken.findFirst({
                where: {
                    user_id,
                    refresh_token,
                },
            });
            return userToken;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.userToken.delete({
                where: {
                    id,
                },
            });
        });
    }
    findByRefreshToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield prisma_1.prisma.userToken.findFirst({
                where: {
                    refresh_token,
                },
            });
            return userToken;
        });
    }
}
exports.UserTokensRepository = UserTokensRepository;
