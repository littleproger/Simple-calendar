import dayjs from 'dayjs';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { fetchHolidays } from '../api/fetchHolidays';
import { assert } from '../utils';
import { useHolidayStore } from './useHolidaysStore';

type State = {
  month: number;
  year: number;
};

export const useCalendarStore = create(subscribeWithSelector<State>(() => {
  const now = dayjs();

  return ({
    month:now.month(),
    year: now.year(),
  });
}));

export const setMonth = (month: number) => {
  useCalendarStore.setState({
    month,
  });
};

export const setYear = (year: number) => {
  useCalendarStore.setState({
    year,
  });
};

useCalendarStore.subscribe(
  (state)=>state.year,
  (year) => {
    const selectedCountry = useHolidayStore.getState().selectedCountry;

    assert(selectedCountry, 'This should never happen. |ak285|');

    fetchHolidays(year, selectedCountry.value);
  },
  {
    fireImmediately: true,
  },
);
