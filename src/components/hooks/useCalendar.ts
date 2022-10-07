import { getCountDaysInMonth, getWeekDaysNames } from './../../utils/date';
import { createDate, createMonth, getMonthNames } from './../../utils/date';
import { useMemo, useState } from 'react';

interface IUseCalendarParams {
  locale?: string;
  selectedDate?: Date;
  firstWeekDayNumber?: number;
}

const DAYS_IN_WEEK = 7;

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;
  return [
    ...Array(10)
      .fill(0)
      .map((_, i) => startYear + i)
  ];
};

export const useCalendar = ({
  locale = 'default',
  selectedDate: date,
  firstWeekDayNumber = 2
}: IUseCalendarParams) => {
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
    const monthNumberOfDays = getCountDaysInMonth(selectedMonth.monthIndex, selectedYear);
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

    const shiftIndex = firstWeekDayNumber - 1;

    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
        ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
        : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
      result[i] = days[i - numberOfPrevDays];
    }

    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction: 'right' | 'left') => {
    if (mode === 'years' && direction === 'left') {
      return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] - 10));
    }
    if (mode === 'years' && direction === 'right') {
      return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] + 10));
    }
    if (mode === 'months' && direction === 'left') {
      const year = selectedYear - 1;
      if (!selectedYearInterval.includes(year)) {
        setSelectedYearInterval(getYearsInterval(year));
      }
      return setSelectedYear(year);
    }
    if (mode === 'months' && direction === 'right') {
      const year = selectedYear + 1;
      if (!selectedYearInterval.includes(year)) {
        setSelectedYearInterval(getYearsInterval(year));
      }
      return setSelectedYear(year);
    }
    if (mode === 'days') {
      const monthIndex =
        direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;
      if (monthIndex === -1) {
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearInterval.includes(year)) {
          setSelectedYearInterval(getYearsInterval(year));
        }
        return setSelectedMonth(createMonth({ date: new Date(selectedYear - 1, 11), locale }));
      }
      setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
    }
  };

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
  };
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
      setMode,
      setSelectedDate,
      onClickArrow,
      setSelectedMonthByIndex,
      setSelectedYear
    }
  };
};
