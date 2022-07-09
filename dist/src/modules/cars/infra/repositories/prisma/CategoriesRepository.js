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
exports.CategoriesRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
class CategoriesRepository {
    create({ name, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma_1.prisma.category.create({
                data: {
                    name,
                    description,
                },
            });
            return category;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma_1.prisma.category
                .findFirst({
                where: {
                    name,
                },
            })
                .then((category) => category);
            return category;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma_1.prisma.category
                .findMany({})
                .then((categories) => categories);
            return categories;
        });
    }
}
exports.CategoriesRepository = CategoriesRepository;
