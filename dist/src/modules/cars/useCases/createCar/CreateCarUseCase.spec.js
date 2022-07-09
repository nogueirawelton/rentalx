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
const AppError_1 = require("@shared/errors/AppError");
const CreateCarUseCase_1 = require("./CreateCarUseCase");
let createCarUseCase;
let carsRepositoryInMemory;
describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase_1.CreateCarUseCase(carsRepositoryInMemory);
    });
    it("Should be able to create a new car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield createCarUseCase.execute({
            name: "Name Example",
            description: "Description Example",
            daily_rate: 100,
            license_plate: "License Example",
            fine_amount: 60,
            brand: "Brand Example",
            category_id: "Category",
        });
        expect(car).toHaveProperty("id");
    }));
    it("Should not be able to create a car with exists license plate", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = {
            name: "Name Example",
            description: "Description Example",
            daily_rate: 100,
            license_plate: "License Example",
            fine_amount: 60,
            brand: "Brand Example",
            category_id: "Category",
        };
        yield createCarUseCase.execute(car);
        yield expect(createCarUseCase.execute(car)).rejects.toEqual(new AppError_1.AppError("Car Already Exists!"));
    }));
    it("Should be able to create a car with availale true default", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = {
            name: "Name Example",
            description: "Description Example",
            daily_rate: 100,
            license_plate: "License Example",
            fine_amount: 60,
            brand: "Brand Example",
            category_id: "Category",
        };
        yield createCarUseCase.execute(car);
        const carCreated = yield carsRepositoryInMemory.findByLicensePlate(car.license_plate);
        expect(carCreated.available).toBe(true);
    }));
});
