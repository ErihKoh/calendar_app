import { createDate } from 'utils/date/createDate';

export const getWeekDaysNames = (locale: string = 'default') => {
  const weekDaysNames: {
    day: ReturnType<typeof createDate>['day'];
    dayShort: ReturnType<typeof createDate>['dayShort'];
  }[] = Array.from({ length: 7 });

  const date = new Date();

  weekDaysNames.forEach((_, i) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i)
    });
    weekDaysNames[dayNumberInWeek - 1] = { day, dayShort };
  });

  const lastDay = weekDaysNames[0];
  const otherDays = weekDaysNames.slice(1);
  return [...otherDays, lastDay];
};
