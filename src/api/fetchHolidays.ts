import { api } from '.';
import { CALENDAR_DATA_API_URL } from '../envVariables';
import type { FetchedHoliday } from '../types';
import { normalizeAndSetHolidays } from '../zustand';

export const fetchHolidays = async (year: number, country: string) => {
  try {
    const response = await api.get<FetchedHoliday[]>(
      `${CALENDAR_DATA_API_URL}v3/PublicHolidays/${year}/${country}`,
      { useCache: true },
    );

    normalizeAndSetHolidays( response );
  } catch (e:unknown) {
    throw Error('This should never happen. |a02j5| ' + e);
  }
};
