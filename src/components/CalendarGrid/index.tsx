import dayjs from 'dayjs';
import React from 'react';
import { useCalendar } from '../../hooks/useCalendar';
import { DayId } from '../../types';
import { useCalendarStore } from '../../zustand';
import { CalendarHeader } from '../CalendarHeader';
import { DayCell } from '../DayCell';
import { Container, DaysGrid, DaysNamesGrid, WeekdayHeader } from './styles';

const DAYS_IN_WEEK = 7;

export const CalendarGrid: React.FC = () => {
  const month = useCalendarStore((s)=>s.month);
  const year = useCalendarStore((s)=>s.year);

  const days = useCalendar(month, year);

  const weekdays = Array.from({ length: 7 }).map((_, i) =>
    dayjs().day(i)
      .format('ddd'),
  );

  return (
    <Container>
      <CalendarHeader />
      <DaysNamesGrid>
        {weekdays.map((day, idx) => (
          <WeekdayHeader key={idx}>
            {
              day
            }
          </WeekdayHeader>
        ))}
      </DaysNamesGrid>
      <DaysGrid $countOfRows={days.length / DAYS_IN_WEEK}>
        {days.map(({ date, isCurrentMonth, isToday }) => {
          const cellId = DayId(date.format('YYYY-MM-DD'));

          return (
            <DayCell
              key={date.toString()}
              cellId={cellId}
              date={date}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
            />
          );
        })}
      </DaysGrid>
    </Container>
  );
};
