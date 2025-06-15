import dayjs, { type Dayjs } from 'dayjs';

type CalendarDay = {
  date: Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export const useCalendar = (month: number, year: number): CalendarDay[] => {
  const today = dayjs();
  const startOfMonth = dayjs().year(year)
    .month(month)
    .startOf('month');
  const endOfMonth = startOfMonth.endOf('month');

  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const days: CalendarDay[] = [];
  let current = startDate;

  while (current.isBefore(endDate) || current.isSame(endDate, 'day')) {
    days.push({
      date: current,
      isCurrentMonth: current.month() === month,
      isToday: current.isSame(today, 'day'),
    });
    current = current.add(1, 'day');
  }

  return days;
};
