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
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
const ListAvailableCarsUseCase_1 = require("./ListAvailableCarsUseCase");
let listCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase_1.ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("Should be able to list all available cars", () => __awaiter(void 0, void 0, void 0, function* () {
        carsRepositoryInMemory.create({
            name: "Example 3",
            description: "Description Example",
            daily_rate: 110.0,
            license_plate: "ZPK-4321",
            fine_amount: 40.0,
            brand: "Audi",
            category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
        });
        carsRepositoryInMemory.create({
            name: "Example 2",
            description: "Description Example",
            daily_rate: 110.0,
            license_plate: "ZPK-4321",
            fine_amount: 40.0,
            brand: "BrandExample2",
            category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
        });
        const cars = yield listCarsUseCase.execute({});
        expect(cars).toHaveLength(2);
    }));
    it("Should be able to list all available cars by brand", () => __awaiter(void 0, void 0, void 0, function* () {
        carsRepositoryInMemory.create({
            name: "Example 1",
            description: "Description Example",
            daily_rate: 110.0,
            license_plate: "ZPK-4321",
            fine_amount: 40.0,
            brand: "BrandExample",
            category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
        });
        const cars = yield listCarsUseCase.execute({
            brand: "BrandExample",
        });
        expect(cars).toHaveLength(1);
    }));
    it("Should be able to list all available cars by name", () => __awaiter(void 0, void 0, void 0, function* () {
        carsRepositoryInMemory.create({
            name: "Example 1",
            description: "Description Example",
            daily_rate: 110.0,
            license_plate: "ZPK-4321",
            fine_amount: 40.0,
            brand: "BrandExample",
            category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
        });
        const cars = yield listCarsUseCase.execute({
            name: "Example 1",
        });
        expect(cars).toHaveLength(1);
    }));
    it("Should be able to list all available cars by category", () => __awaiter(void 0, void 0, void 0, function* () {
        carsRepositoryInMemory.create({
            name: "Example 1",
            description: "Description Example",
            daily_rate: 110.0,
            license_plate: "ZPK-4321",
            fine_amount: 40.0,
            brand: "BrandExample",
            category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
        });
        const cars = yield listCarsUseCase.execute({
            category_id: "5d041efa-5a26-4f07-a88c-796809317bca",
        });
        expect(cars).toHaveLength(1);
    }));
});
