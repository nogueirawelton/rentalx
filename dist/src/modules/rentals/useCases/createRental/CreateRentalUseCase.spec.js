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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
const RentalsRepositoryInMemory_1 = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const AppError_1 = require("@shared/errors/AppError");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
let rentalsRepositoryInMemory;
let dayjsDateProvider;
let createRentalUseCase;
let carsRepositoryInMemory;
describe("Create Rental", () => {
    const dayAdd24Hours = (0, dayjs_1.default)().add(2, "day").toDate();
    let car;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory_1.RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase_1.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
        car = yield carsRepositoryInMemory.create({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            fine_amount: 40,
            category_id: "1234",
            license_plate: "1234",
            brand: "Brand Name",
        });
    }));
    it("Should be able to create a new rental", () => __awaiter(void 0, void 0, void 0, function* () {
        const rental = yield createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    }));
    it("Should not be able to create a new rental if there's another open to the same user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        yield expect(createRentalUseCase.execute({
            user_id: "123",
            car_id: "321",
            expected_return_date: dayAdd24Hours,
        })).rejects.toEqual(new AppError_1.AppError("There's a Rental in Progress For This User!"));
    }));
    it("Should not be able to create a new rental if there's another open to the same car", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createRentalUseCase.execute({
            user_id: "123",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });
        yield expect(createRentalUseCase.execute({
            user_id: "321",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        })).rejects.toEqual(new AppError_1.AppError("Car Is Unavailable!"));
    }));
    it("Should not be able to create a new rental with invalid return time", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createRentalUseCase.execute({
            user_id: "123",
            car_id: "123",
            expected_return_date: new Date(),
        })).rejects.toEqual(new AppError_1.AppError("Invalid Return Time!"));
    }));
});
