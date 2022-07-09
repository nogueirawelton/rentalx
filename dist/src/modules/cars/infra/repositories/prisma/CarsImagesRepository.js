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
exports.CarsImagesRepository = void 0;
const prisma_1 = require("@shared/infra/prisma");
class CarsImagesRepository {
    create(id, image_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const carImage = yield prisma_1.prisma.carImage.create({
                data: {
                    image_name,
                    car_id: id,
                },
            });
            return carImage;
        });
    }
}
exports.CarsImagesRepository = CarsImagesRepository;
