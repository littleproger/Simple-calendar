import styled, { css } from 'styled-components';

export const TextArea = styled.textarea(({ theme })=>css`
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  font-size: ${theme.font.size.base};
  transition: border-color 0.2s ease;

  resize: none;
  height: ${theme.spacing(16)};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: ${theme.colors.inputFocusBG};
  }
`);
