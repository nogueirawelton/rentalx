"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
const uuid_1 = require("uuid");
class Rental {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
            this.start_date = new Date();
            this.created_at = new Date();
            this.updated_at = new Date();
        }
    }
}
exports.Rental = Rental;
