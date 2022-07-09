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
exports.CarsRepositoryInMemory = void 0;
const Car_1 = require("@modules/cars/entities/Car");
class CarsRepositoryInMemory {
    constructor() {
        this.cars = [];
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = new Car_1.Car();
            Object.assign(car, data);
            this.cars.push(car);
            return car;
        });
    }
    findByLicensePlate(license_plate) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = this.cars.find((car) => car.license_plate === license_plate);
            return car;
        });
    }
    findAvailable(brand, category_id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const availableCars = this.cars.filter((car) => car.available);
            let filtredCars;
            if (brand || category_id || name) {
                filtredCars = availableCars.filter((car) => {
                    if (car.brand === brand ||
                        car.category_id === category_id ||
                        car.name === name) {
                        return car;
                    }
                    return null;
                });
                return filtredCars;
            }
            return availableCars;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cars.find((car) => car.id === id);
        });
    }
    updateSpecifications({ id, specifications, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = this.cars.find((car) => car.id === id);
            car.specifications = specifications;
            return car;
        });
    }
    updateAvailable(id, available) {
        return __awaiter(this, void 0, void 0, function* () {
            const car = this.cars.find((car) => car.id === id);
            car.available = available;
            return car;
        });
    }
}
exports.CarsRepositoryInMemory = CarsRepositoryInMemory;
