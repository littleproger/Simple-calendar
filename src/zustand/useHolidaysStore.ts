import { create } from 'zustand';
import { fetchHolidays } from '../api/fetchHolidays';
import type { Option } from '../components/SearchableSelector';
import type { FetchedHoliday, Holiday } from '../types';
import { useCalendarStore } from './useCalendarStore';

type HolidayState = {
  holidays: Map<string, Holiday[]>;
  selectedCountry: Option;
  error: string|null;
}

export const useHolidayStore = create<HolidayState>(() => ({
  holidays: new Map(),
  selectedCountry: {
    value: 'GB',
    label: 'United Kingdom',
  },
  error: null,
}));

export const selectHolidaysCountry = (country: Option) => {
  useHolidayStore.setState({ selectedCountry: country });
  const year = useCalendarStore.getState().year;

  fetchHolidays(year, country.value);

};

export const normalizeAndSetHolidays = (fetchedHolidays:FetchedHoliday[]): void => {
  const holidayMap = new Map<string, Holiday[]>();

  fetchedHolidays.forEach((fetchedHoliday) => {
    const normalizedHoliday: Holiday = {
      id: `${fetchedHoliday.countryCode}-${fetchedHoliday.date}`,
      date: fetchedHoliday.date,
      name: fetchedHoliday.name,
    };

    if (holidayMap.has(fetchedHoliday.date)) {
      holidayMap.get(fetchedHoliday.date)?.push(normalizedHoliday);
    } else {
      holidayMap.set(fetchedHoliday.date, [normalizedHoliday]);
    }
  });

  useHolidayStore.setState({ holidays: holidayMap });
};
