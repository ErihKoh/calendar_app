import { createDate, createMonth, getMonthNames } from './../../utils/date';
import { useMemo, useState } from 'react';

interface IUseCalendarParams {
  locale?: string;
  selectedDate?: Date;
}

export const useCalendar = ({ locale = 'default', selectedDate: date }: IUseCalendarParams) => {
  const [mode, setMode] = useState<'days' | 'months' | 'years'>('days');
  const [selectedDate, setSelectedDate] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale })
  );
  const [selectedYear, setSelectedYear] = useState(selectedDate.year);

  const monthsNames = useMemo(() => getMonthNames(locale), [locale]);
  const weekDaysNames = useMemo(() => getMonthNames(locale), [locale]);
  return {};
};
