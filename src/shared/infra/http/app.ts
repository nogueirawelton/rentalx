import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerui from "swagger-ui-express";
import "reflect-metadata";

import "@shared/container";
import { AppError } from "@shared/errors/AppError";

import swaggerDocument from "../../../swagger.json";
import { router } from "./routes";

export const app = express();
app.use(express.json());
app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument));
app.use(router);
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);