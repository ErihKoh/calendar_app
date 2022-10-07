import { getCountDaysInMonth, getWeekDaysNames } from './../../utils/date';
import { createDate, createMonth, getMonthNames } from './../../utils/date';
import { useMemo, useState } from 'react';

interface IUseCalendarParams {
  locale?: string;
  selectedDate?: Date;
}

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;
  return [
    ...Array(10)
      .fill(0)
      .map((_, i) => startYear + i)
  ];
};

export const useCalendar = ({ locale = 'default', selectedDate: date }: IUseCalendarParams) => {
  const [mode, setMode] = useState<'days' | 'months' | 'years'>('days');
  const [selectedDate, setSelectedDate] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale })
  );
  const [selectedYear, setSelectedYear] = useState(selectedDate.year);
  const [selectedYearInterval, setSelectedYearInterval] = useState(
    getYearsInterval(selectedDate.year)
  );

  const monthsNames = useMemo(() => getMonthNames(locale), [locale]);
  const weekDaysNames = useMemo(() => getWeekDaysNames(locale), [locale]);

  const days = useMemo(() => selectedMonth.getDaysInMonth(), [selectedMonth]);

  const calendarAllDays = useMemo(() => {
    const monthNumberOfDays = getCountDaysInMonth(selectedDate.monthIndex, selectedYear);
    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale
    }).getDaysInMonth();
    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale
    }).getDaysInMonth();

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 < 0
        ? 7 - firstDay.dayNumberInWeek
        : firstDay.dayNumberInWeek - 1;

    const numberOfNextDays = lastDay.dayNumberInWeek - 1 < 6 ? 7 - lastDay.dayNumberInWeek : 0;

    const visiblePrevDays = prevMonthDays.slice(-(numberOfPrevDays - 1));

    const visibleNextDay = nextMonthDays.slice(0, numberOfNextDays + 1);

    return [...visiblePrevDays, ...days, ...visibleNextDay];
  }, [selectedDate.monthIndex, selectedYear]);

  return {
    state: {
      mode,
      calendarAllDays,
      weekDaysNames,
      monthsNames,
      selectedDate,
      selectedMonth,
      selectedYear,
      selectedYearInterval
    },
    functions: {
      setMode
    }
  };
};
