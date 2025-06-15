import styled from 'styled-components';
import { searchTaskByQuery, setFilterQuery } from '../../zustand';
import { CountryPicker } from '../CountryPicker';
import { Label, LabelWithInputWrapper } from '../Label';
import { SearchInput } from '../SearchInput';

const CalendarToolsWrapper = styled.div`
  height:100%;
  max-height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 12px;
`;

export const CalendarTools = () => {
  return (
    <CalendarToolsWrapper>
      <LabelWithInputWrapper>
        <Label htmlFor="filterTask">Filter tasks:</Label>
        <SearchInput
          id="filterTask"
          onChange={(p)=>setFilterQuery(p)}
          placeholder='Filter tasks by...'
        />
      </LabelWithInputWrapper>
      <LabelWithInputWrapper>
        <Label htmlFor="searchTask">Search task:</Label>
        <SearchInput
          id="searchTask"
          onChange={(p)=>searchTaskByQuery(p)}
        />
      </LabelWithInputWrapper>
      <LabelWithInputWrapper>
        <Label id='#'>
          Select country to load holiday calendar:
        </Label>
        <CountryPicker />
      </LabelWithInputWrapper>
    </CalendarToolsWrapper>
  );
};
