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
exports.SpecificationsRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
class SpecificationsRepository {
    create({ name, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const specification = yield prisma_1.prisma.specification.create({
                data: {
                    name,
                    description,
                },
            });
            return specification;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const specification = yield prisma_1.prisma.specification
                .findFirst({
                where: {
                    name,
                },
            })
                .then((specification) => specification);
            return specification;
        });
    }
    findByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const specification = yield prisma_1.prisma.specification
                .findMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
            })
                .then((specification) => specification);
            return specification;
        });
    }
}
exports.SpecificationsRepository = SpecificationsRepository;
