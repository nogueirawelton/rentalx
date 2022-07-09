"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("@config/upload"));
const CreateCarController_1 = require("@modules/cars/useCases/createCar/CreateCarController");
const CreateCarSpecificationController_1 = require("@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");
const ListAvailableCarsController_1 = require("@modules/cars/useCases/listAvailableCars/ListAvailableCarsController");
const UploadCarImagesController_1 = require("@modules/cars/useCases/uploadCarImages/UploadCarImagesController");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
exports.carsRoutes = (0, express_1.Router)();
const createCarController = new CreateCarController_1.CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController_1.ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationController_1.CreateCarsSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController_1.UploadCarImagesController();
const uploadCarImages = (0, multer_1.default)(upload_1.default);
exports.carsRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarController.handle);
exports.carsRoutes.get("/available", listAvailableCarsController.handle);
exports.carsRoutes.post("/specifications/:id", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarSpecificationsController.handle);
exports.carsRoutes.post("/images/:id", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, uploadCarImages.array("images"), uploadCarImagesController.handle);