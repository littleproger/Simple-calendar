import dayjs from 'dayjs';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { setMonth, setYear, useCalendarStore } from '../zustand';

const Header = styled.div`
  height: ${({ theme })=>theme.sizes.calendarHeaderHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: ${({ theme })=>theme.font.size.lg};
  font-weight: ${({ theme })=>theme.font.weight.bold};
  border-bottom: 1px solid ${({ theme })=>theme.colors.border};
`;

const NavButtons = styled.div`
  display: flex;
  gap: 8px;

  button {
    background: transparent;
    border: none;
    font-size: ${({ theme })=>theme.font.size.lg};
    cursor: pointer;
  }
`;


export const  CalendarHeader = () => {
  const month = useCalendarStore((s)=>s.month);
  const year = useCalendarStore((s)=>s.year);
  const monthYearLabel = dayjs().year(year)
    .month(month)
    .format('MMMM YYYY');

  return (
    <Header>
      <NavButtons>
        <button onClick={() => setYear(year - 1)}>
          <FaAngleDoubleLeft />
        </button>
        <button
          onClick={() => {
            if (month === 0) {
              setMonth(11);
              setYear(year - 1);
            } else {
              setMonth(month - 1);
            }
          }}
        >
          <FaAngleLeft />
        </button>
      </NavButtons>
      {monthYearLabel}
      <NavButtons>
        <button
          onClick={() => {
            if (month === 11) {
              setMonth(0);
              setYear(year + 1);
            } else {
              setMonth(month + 1);
            }
          }}
        >
          <FaAngleRight />
        </button>
        <button onClick={() => setYear(year + 1)}>
          <FaAngleDoubleRight />
        </button>
      </NavButtons>
    </Header>
  );
};
