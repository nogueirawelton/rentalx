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
exports.UsersRepositoryInMemory = void 0;
const User_1 = require("@modules/accounts/entities/User");
class UsersRepositoryInMemory {
    constructor() {
        this.users = [];
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User();
            Object.assign(user, data);
            this.users.push(user);
            return user;
        });
    }
    updateAvatar(user_id, avatar_file) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find((user) => user.id === user_id);
            user.avatar = avatar_file;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find((user) => user.email === email);
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find((user) => user.id === id);
            return user;
        });
    }
    updatePassword(id, newPass) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.find((user) => user.id === id);
            user.password = newPass;
        });
    }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;
