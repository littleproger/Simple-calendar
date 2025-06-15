import type { RuleSet } from 'styled-components';
import styled, { css } from 'styled-components';

type InputVariant = 'default' | 'ghost';

type InputProps = {
  variant?: InputVariant;
}

const variantStyles = {
  default: css`
    padding: 0.75rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.inputFocusBG};
    }
  `,
  ghost: css`
    border: none;
    outline: none;
    background: transparent;
  `,
} satisfies Record<InputVariant, RuleSet>;

export const Input = styled.input<InputProps>(({ theme, variant = 'ghost' })=>css`
  border-radius: ${theme.radius.md};
  font-size: ${theme.font.size.base};
  color: ${theme.colors.textPrimary};

  ${variantStyles[variant]}
`);
