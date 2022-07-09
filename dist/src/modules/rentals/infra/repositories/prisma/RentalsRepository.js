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
exports.RentalsRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
class RentalsRepository {
    findOpenRentalByCar(car_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const openByCar = yield prisma_1.prisma.rental.findFirst({
                where: {
                    car_id,
                    end_date: null,
                },
            });
            return openByCar;
        });
    }
    findOpenRentalByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const openByUser = yield prisma_1.prisma.rental.findFirst({
                where: {
                    user_id,
                    end_date: null,
                },
            });
            return openByUser;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield prisma_1.prisma.rental.create({
                data,
            });
            return rental;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield prisma_1.prisma.rental.findUnique({
                where: {
                    id,
                },
            });
            return rental;
        });
    }
    closeRental(id, total) {
        return __awaiter(this, void 0, void 0, function* () {
            const rental = yield prisma_1.prisma.rental.update({
                where: {
                    id,
                },
                data: {
                    total,
                    end_date: new Date(),
                    updatedAt: new Date(),
                },
            });
            return rental;
        });
    }
    findByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rentals = yield prisma_1.prisma.rental.findMany({
                where: {
                    user_id,
                },
                select: {
                    id: true,
                    start_date: true,
                    end_date: true,
                    expected_return_date: true,
                    total: true,
                    createdAt: true,
                    updatedAt: true,
                    user_id: true,
                    car: true,
                },
            });
            return rentals;
        });
    }
}
exports.RentalsRepository = RentalsRepository;
