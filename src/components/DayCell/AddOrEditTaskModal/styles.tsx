import styled, { css } from 'styled-components';

export const FormWrapper = styled.form(({ theme }) => css`
  width: 100%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${theme.colors.surface};
  padding: 1.5rem;
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadow.md};
  max-width: 450px;
  box-sizing: border-box;
`);

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.font.size.sm};
  margin-top: -0.5rem;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.font.size.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
