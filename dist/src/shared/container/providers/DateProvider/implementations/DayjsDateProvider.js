"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayjsDateProvider = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class DayjsDateProvider {
    compareInHours(start_date, end_date) {
        return (0, dayjs_1.default)(end_date).diff(start_date, "hours");
    }
    compareInDays(start_date, end_date) {
        return (0, dayjs_1.default)(end_date).diff(start_date, "days");
    }
    addDays(days) {
        return (0, dayjs_1.default)().add(days, "days").toDate();
    }
    addHours(hours) {
        return (0, dayjs_1.default)().add(hours, "hours").toDate();
    }
    compareIfBefore(start_date, end_date) {
        return (0, dayjs_1.default)(start_date).isBefore(end_date);
    }
}
exports.DayjsDateProvider = DayjsDateProvider;
