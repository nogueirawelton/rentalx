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
const SpecificationsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateSpecificationUseCase_1 = require("./CreateSpecificationUseCase");
let specificationsRepositoryInMemory;
let createSpecificationUseCase;
describe("Create Specification", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase_1.CreateSpecificationUseCase(specificationsRepositoryInMemory);
    });
    it("Should be able to create a new specification", () => __awaiter(void 0, void 0, void 0, function* () {
        const specification = yield createSpecificationUseCase.execute({
            name: "Example Name",
            description: "Description Example",
        });
        expect(specification).toHaveProperty("id");
    }));
    it("Should not be able to create a existent specification", () => __awaiter(void 0, void 0, void 0, function* () {
        yield createSpecificationUseCase.execute({
            name: "Example Name",
            description: "Description Example",
        });
        yield expect(createSpecificationUseCase.execute({
            name: "Example Name",
            description: "Description Example",
        })).rejects.toEqual(new AppError_1.AppError("Specification Already Exists!"));
    }));
});
