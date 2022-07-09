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
exports.CarsRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
class CarsRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield prisma_1.prisma.car.create({
                data,
            });
            return car;
        });
    }
    findByLicensePlate(license_plate) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield prisma_1.prisma.car.findUnique({
                where: {
                    license_plate,
                },
            });
            return car;
        });
    }
    findAvailable(brand, category_id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield prisma_1.prisma.car.findMany({
                where: Object.assign(Object.assign(Object.assign({ available: true }, (brand && { brand })), (category_id && { category_id })), (name && { name })),
                include: {
                    specifications: true,
                    car_images: true,
                },
            });
            return cars;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = prisma_1.prisma.car.findUnique({
                where: {
                    id,
                },
            });
            return car;
        });
    }
    updateSpecifications({ id, specifications, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield prisma_1.prisma.car.update({
                where: {
                    id,
                },
                include: {
                    specifications: true,
                },
                data: {
                    specifications: {
                        set: [],
                        connect: specifications.map((specification) => {
                            return {
                                id: specification.id,
                            };
                        }),
                    },
                },
            });
            return car;
        });
    }
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = yield prisma_1.prisma.car.update({
                where: {
                    id,
                },
                data: {
                    available,
                },
            });
            return car;
        });
    }
}
exports.CarsRepository = CarsRepository;
