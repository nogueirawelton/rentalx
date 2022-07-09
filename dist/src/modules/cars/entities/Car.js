"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const uuid_1 = require("uuid");
class Car {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
            this.available = true;
            this.created_at = new Date();
        }
    }
}
exports.Car = Car;
