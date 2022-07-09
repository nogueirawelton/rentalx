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
const SpecificationsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });
    it("Should not be able to add a new specification to a non-existent car", () => __awaiter(void 0, void 0, void 0, function* () {
        const id = "12345";
        const specifications = ["54321"];
        yield expect(createCarSpecificationUseCase.execute({
            id,
            specifications,
        })).rejects.toEqual(new AppError_1.AppError("Car Not Exists!"));
    }));
    it("Should be able to add a new specification to the car", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Name Example",
            description: "Description Example",
            daily_rate: 100,
            license_plate: "License Example",
            fine_amount: 60,
            brand: "Brand Example",
            category_id: "Category",
        });
        const specification = yield specificationsRepositoryInMemory.create({
            name: "Example",
            description: "Description Example",
        });
        const specifications = [specification.id];
        const updatedCar = yield createCarSpecificationUseCase.execute({
            id: car.id,
            specifications,
        });
        expect(updatedCar).toHaveProperty("specifications");
    }));
});
