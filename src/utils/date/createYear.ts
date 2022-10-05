import { createDate } from "utils/date/createDate";
import { createMonth } from "./createMonth";

interface ICreateYearParams {
  locale?: string;
  monthNumber?: number;
  year?: number;
  date?: Date;
}

export const createYear = (params?: ICreateYearParams) => {
  const locale = params?.locale ?? "default";

  const monthCount = 12;
  const currentDay = createDate();

  const year = params?.year ?? currentDay.year;
  const monthNumber = params?.monthNumber ?? currentDay.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex: number) =>
    createMonth({ date: new Date(year, monthIndex), locale }).getDaysInMonth(
      monthIndex,
      year
    );
  const monthsInYear = Array(monthCount)
    .fill(0)
    .map((_, i) => getMonthDays(i));

  return {
    monthsInYear,
    month,
    year,
  };
};
