import dayjs from "dayjs";

import { IDateProvider } from "../IDateProvider";

export class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    return dayjs(end_date).diff(start_date, "hours");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    return dayjs(end_date).diff(start_date, "days");
  }
}
