import { useCalendar } from 'components/hooks/useCalendar';
import { checkDateIsEqual, checkIsToday, getWeekDaysNames } from 'utils/date';
import style from './Calendar.module.css';
interface ICalendarProps {
  locale?: string;
  selectedDate?: Date;
  selectDate: (date: Date) => void;
}

const Calendar: React.FC<ICalendarProps> = ({ locale = 'default', selectDate, selectedDate }) => {
  const { state, functions } = useCalendar({ locale, selectedDate });

  return (
    <div className={style.calendar}>
      <div className={style.calendar__header}>
        <div aria-hidden className={style.calendar__header__arrow__left}></div>
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
        <div aria-hidden className={style.calendar__header__arrow__right}></div>
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
                    key={`${day.dayNumber}-${day.monthIndex}`}
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
      </div>
    </div>
  );
};

export default Calendar;
