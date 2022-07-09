"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("@config/upload"));
const CreateCategoryController_1 = require("@modules/cars/useCases/createCategory/CreateCategoryController");
const ImportCategoryController_1 = require("@modules/cars/useCases/importCategory/ImportCategoryController");
const ListCategoriesController_1 = require("@modules/cars/useCases/listCategories/ListCategoriesController");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
exports.categoriesRoutes = (0, express_1.Router)();
const uploadCategories = (0, multer_1.default)(upload_1.default);
const createCategoryController = new CreateCategoryController_1.CreateCategoryController();
const importCategoryController = new ImportCategoryController_1.ImportCategoryController();
const listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
exports.categoriesRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
exports.categoriesRoutes.get("/", listCategoriesController.handle);
exports.categoriesRoutes.post("/import", uploadCategories.single("file"), ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, importCategoryController.handle);
