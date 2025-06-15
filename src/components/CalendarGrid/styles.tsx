import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const DaysGridWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DaysGrid = styled.div<{$countOfRows: number}>((p)=>css`
  height: ${p.theme.sizes.calendarHeight};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ${p.$countOfRows ? css`
    grid-template-rows: repeat(${p.$countOfRows}, ${100 / p.$countOfRows}%);
  ` : ''}
`);

export const DaysNamesGrid = styled(DaysGrid)<{$countOfRows?: undefined}>`
  height: ${({ theme })=>theme.sizes.calendarDaysHeigh};
  display: grid;
  grid-template-rows: 35px;
`;

export const WeekdayHeader = styled.div(({ theme })=>`
  text-align: center;
  padding: 4px;
  background: ${theme.colors.surface};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.lg};
  border-bottom: 1px solid ${theme.colors.border};
`);
