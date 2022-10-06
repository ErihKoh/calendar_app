import { useCalendar } from 'components/hooks/useCalendar';

interface ICalendarProps {
  locale?: string;
  selectedDate?: Date;
  selectDate: (date: Date) => void;
}

const Calendar: React.FC<ICalendarProps> = ({ locale = 'default', selectDate, selectedDate }) => {
  const {} = useCalendar({ locale, selectedDate });
  return <div>Calendar</div>;
};

export default Calendar;
