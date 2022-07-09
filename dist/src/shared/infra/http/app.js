"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
require("reflect-metadata");
require("@shared/container");
const upload_1 = __importDefault(require("@config/upload"));
const AppError_1 = require("@shared/errors/AppError");
const swagger_json_1 = __importDefault(require("../../../swagger.json"));
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
exports.app.use(routes_1.router);
exports.app.use("/avatar", express_1.default.static(`${upload_1.default.tmpFolder}/avatar`));
exports.app.use("/avatar", express_1.default.static(`${upload_1.default.tmpFolder}/cars`));
exports.app.use(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal Server Error - ${err.message}`,
    });
});
