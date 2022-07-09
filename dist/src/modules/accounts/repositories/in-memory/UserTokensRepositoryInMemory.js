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
exports.UserTokensRepositoryInMemory = void 0;
const UserToken_1 = require("@modules/accounts/entities/UserToken");
class UserTokensRepositoryInMemory {
    constructor() {
        this.userTokens = [];
    }
    create({ user_id, refresh_token, expires_date, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = new UserToken_1.UserToken();
            Object.assign(userToken, {
                user_id,
                refresh_token,
                expires_date,
            });
            this.userTokens.push(userToken);
            return userToken;
        });
    }
    findByUserIdAndRefreshToken(user_id, refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = this.userTokens.find((ut) => ut.user_id === user_id && ut.refresh_token === refresh_token);
            return userToken;
        });
    }
    findByRefreshToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = this.userTokens.find((ut) => ut.refresh_token === refresh_token);
            return userToken;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUserTokens = this.userTokens.filter((ut) => ut.id !== id);
            this.userTokens = updatedUserTokens;
        });
    }
}
exports.UserTokensRepositoryInMemory = UserTokensRepositoryInMemory;
