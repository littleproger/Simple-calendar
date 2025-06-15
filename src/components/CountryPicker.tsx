import { loadCountriesOptions } from '../api/fetchCountries';
import { selectHolidaysCountry, useHolidayStore } from '../zustand';
import { SearchableSelector, type Option } from './SearchableSelector';

export const CountryPicker = () => {
  const selectedCountry = useHolidayStore((s)=>s.selectedCountry);

  const handleChange = (option: Option | null) => {
    if (option) {
      selectHolidaysCountry(option);
    }
  };

  return (
    <SearchableSelector
      loadOnce={loadCountriesOptions}
      onChange={(v)=>handleChange(v)}
      defaultValue={selectedCountry}
      placeholder="Select holidays country"
    />
  );
};
