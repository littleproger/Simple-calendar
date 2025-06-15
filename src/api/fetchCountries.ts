import { api } from '.';
import { CALENDAR_DATA_API_URL } from '../envVariables';
import type { FetchedCountries } from '../types';

export const fetchCountries = async () => {
  try {
    const countries = await api.get<FetchedCountries>(
      `${CALENDAR_DATA_API_URL}v3/AvailableCountries`,
      { useCache: true },
    );

    return countries;
  } catch (e:unknown) {
    throw Error('This should never happen. |a02j5| ' + e);
  }
};

export const loadCountriesOptions = async () => {
  const countriesOptions = await fetchCountries();

  return countriesOptions.map((c: any) => ({
    label: c.name,
    value: c.countryCode,
  }));
};
