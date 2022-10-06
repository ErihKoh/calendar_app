import { createDate } from './createDate';
import { getCountDaysInMonth } from './getCountDaysInMonth';

interface ICreateMonthParams {
  locale?: string;
  date?: Date;
}

export const createMonth = (params?: ICreateMonthParams) => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? 'default';
  const d = createDate({ date, locale });

  const { month: monthName, year, monthNumber, monthIndex } = d;
  const getDay = (dayNumber: number) => {
    return createDate({ date: new Date(year, monthIndex, dayNumber), locale });
  };

  const getDaysInMonth = () =>
    Array(getCountDaysInMonth(monthIndex, year))
      .fill(0)
      .map((_, i) => getDay(i + 1));

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    getDaysInMonth
  };
};
