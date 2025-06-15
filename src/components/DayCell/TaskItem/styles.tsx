import styled, { css } from 'styled-components';

type StyledTaskProps = {$isDragging: boolean; $completed?: boolean, $color?: string}

export const StyledTask = styled.div<StyledTaskProps>((
  { theme, $isDragging, $completed, $color },
)=>css`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  min-height: 60px;
  margin: 10px 0;

  background: ${theme.colors.taskBg};
  border-left: 4px solid ${$color ?? theme.colors.border};
  border-radius: ${theme.radius.sm};
  cursor: pointer;
  opacity: ${($isDragging ? 0.5 : 1)};
  text-decoration: ${($completed ? 'line-through' : 'none')};
  color: ${$completed ? theme.colors.textSecondary : theme.colors.textPrimary};
  transition: background 0.2s ease;
`);

export const TagWrapper = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #eee;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 0.8rem;
  color: #444;
`;

export const Title = styled.span(({ theme })=>css`
  font-weight: ${theme.font.weight.medium};
  font-size: ${theme.font.size.base};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`);

export const Description = styled.span(({ theme })=>css`
  font-weight: ${theme.font.weight.regular};
  font-size: ${theme.font.size.sm};
  ${theme.maxLines(2)}
`);
