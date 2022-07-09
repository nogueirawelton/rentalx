"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specification = void 0;
const uuid_1 = require("uuid");
class Specification {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
            this.created_at = new Date();
        }
    }
}
exports.Specification = Specification;
