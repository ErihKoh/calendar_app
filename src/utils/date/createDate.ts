import { getWeekNumber } from './getWeekNumber';

interface ICreateDateParams {
  locale?: string;
  date?: Date;
}

export const createDate = (params?: ICreateDateParams) => {
  const locale = params?.locale ?? 'default';

  const d = params?.date ?? new Date();
  const dayNumber = d.getDate();
  const day = d.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = d.getDate() + 1;
  const dayShort = d.toLocaleDateString(locale, { weekday: 'short' });
  const weekNumber = getWeekNumber(d);
  const monthNumber = d.getMonth() + 1;
  const monthIndex = d.getMonth();
  const month = d.toLocaleDateString(locale, { month: 'long' });
  const monthShort = d.toLocaleDateString(locale, { month: 'short' });
  const year = d.getFullYear();
  const yearShort = d.toLocaleDateString(locale, { year: '2-digit' });
  const timestamp = d.getTime();
  return {
    date: d,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    weekNumber,
    monthNumber,
    monthIndex,
    month,
    monthShort,
    year,
    yearShort,
    timestamp
  };
};
