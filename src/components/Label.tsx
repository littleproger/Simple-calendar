import styled from 'styled-components';

export const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;


export const LabelWithInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
