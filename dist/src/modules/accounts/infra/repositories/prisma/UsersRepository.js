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
exports.UsersRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
class UsersRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.create({ data });
            return user;
        });
    }
    updateAvatar(user_id, avatar_file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.user.update({
                where: {
                    id: user_id,
                },
                data: {
                    avatar: avatar_file,
                },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    id,
                },
            });
            return user;
        });
    }
    updatePassword(id, newPass) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.user.update({
                where: {
                    id,
                },
                data: {
                    password: newPass,
                },
            });
        });
    }
}
exports.UsersRepository = UsersRepository;
