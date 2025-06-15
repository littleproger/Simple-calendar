import styled, { css } from 'styled-components';
import { commonStyles } from '../../commonStyles';

export const DateHeader = styled.div`
  font-size: ${({ theme })=>theme.font.size.base};
  display: flex;
  justify-content: space-between;
`;

export const AddButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${({ theme })=>theme.font.size.sm};
  cursor: pointer;
  color: ${({ theme })=>theme.colors.primary};
`;

export const HolidayItem = styled.div(({ theme })=>`
  font-size: ${theme.font.size.base};
  margin-top: 4px;
  padding: 5px 8px;
  border-radius: ${theme.radius.sm};
  background: ${theme.colors.holiday};
  cursor: default;
`);

export const Cell = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean }>(({
  $isToday, $isCurrentMonth, theme,
}) => css`
  border: 1px solid ${theme.colors.border};
  padding: 6px;
  height: 100%;
  background: ${$isCurrentMonth ? theme.colors.surface : theme.colors.surfaceAlt};
  color: ${$isCurrentMonth ? theme.colors.textPrimary : theme.colors.textDisabled};
  position: relative;

  opacity: ${$isCurrentMonth ? 1 : 0.5};

  display: flex;
  flex-direction: column;
  
  ${$isToday && css`
    outline: 2px solid ${theme.colors.todayBorder};
    outline-offset: -2px;
  `}
`);

export const Scrollable = styled.div`
  ${commonStyles.scroll}
  position: relative;
  padding-right: 5px;
`;
