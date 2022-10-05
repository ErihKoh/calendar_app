export const getCountDaysInMonth = (month: number, yearNumber: number) =>
  new Date(yearNumber, month + 1, 0).getDate();
