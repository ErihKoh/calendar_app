import { useCalendar } from 'components/hooks/useCalendar';
import { checkDateIsEqual, checkIsToday, getMonthNames, getWeekDaysNames } from 'utils/date';
import style from './Calendar.module.css';
interface ICalendarProps {
  locale?: string;
  selectedDate?: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
}

const Calendar: React.FC<ICalendarProps> = ({
  locale = 'default',
  selectDate,
  selectedDate,
  firstWeekDayNumber = 2
}) => {
  const { state, functions } = useCalendar({ locale, selectedDate, firstWeekDayNumber });

  return (
    <div className={style.calendar}>
      <div className={style.calendar__header}>
        <div
          aria-hidden
          className={style.calendar__header__arrow__left}
          onClick={() => functions.onClickArrow('left')}
        ></div>
        {state.mode === 'days' && (
          <div aria-hidden onClick={() => functions.setMode('months')}>
            {state.monthsNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'months' && (
          <div aria-hidden onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )}

        {state.mode === 'years' && (
          <div>
            {state.selectedYearInterval[0]} -{' '}
            {state.selectedYearInterval[state.selectedYearInterval.length - 1]}
          </div>
        )}
        <div
          aria-hidden
          className={style.calendar__header__arrow__right}
          onClick={() => functions.onClickArrow('right')}
        ></div>
      </div>
      <div className={style.calendar__body}>
        {state.mode === 'days' && (
          <>
            <ul className={style.calendar__week__names}>
              {state.weekDaysNames.map((getWeekDaysNames) => (
                <li key={getWeekDaysNames.dayShort}>{getWeekDaysNames.dayShort}</li>
              ))}
            </ul>
            <ul className={style.calendar__days}>
              {state.calendarAllDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDate.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                return (
                  <li
                    aria-hidden
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    onClick={() => {
                      functions.setSelectedDate(day);
                      selectDate(day.date);
                    }}
                    className={[
                      `${style.calendar__day}`,
                      isToday ? `${style.calendar__today__item}` : '',
                      isSelectedDay ? `${style.calendar__selected__item}` : '',
                      isAdditionalDay ? `${style.calendar__additional__day}` : ''
                    ].join(' ')}
                  >
                    {day.dayNumber}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {state.mode === 'months' && (
          <ul className={style.calendar__pick__items__container}>
            {state.monthsNames.map((monthsName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthsName.monthIndex &&
                new Date().getFullYear() === state.selectedYear;
              const isSelectedMonth = monthsName.monthIndex === state.selectedMonth.monthIndex;
              return (
                <li
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthsName.monthIndex);
                    functions.setMode('days');
                  }}
                  key={monthsName.month}
                  className={[
                    `${style.calendar__pick__item}`,
                    isCurrentMonth ? `${style.calendar__today__item}` : '',
                    isSelectedMonth ? `${style.calendar__selected__item}` : ''
                  ].join(' ')}
                >
                  {monthsName.monthShort}
                </li>
              );
            })}
          </ul>
        )}
        {state.mode === 'years' && (
          <div className={style.calendar__pick__items__container}>
            <div className={style.calendar__unchoosable__year}>
              {state.selectedYearInterval[0] - 1}
            </div>
            {state.selectedYearInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;
              return (
                <div
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('months');
                  }}
                  key={year}
                  className={[
                    `${style.calendar__pick__item}`,
                    isCurrentYear ? `${style.calendar__today__item}` : '',
                    isSelectedYear ? `${style.calendar__selected__item}` : ''
                  ].join(' ')}
                >
                  {year}
                </div>
              );
            })}
            <div className={style.calendar__unchoosable__year}>
              {state.selectedYearInterval[state.selectedYearInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
