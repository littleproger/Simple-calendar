import styled, { css, type RuleSet } from 'styled-components';

type ButtonVariant = 'primary' | 'default' | 'outlined' | 'ghost' | 'dangerous';

type ButtonProps = {
  variant?: ButtonVariant;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textForPrimary};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  dangerous: css`
    background: ${({ theme }) => theme.colors.dangerous};
    color: ${({ theme }) => theme.colors.textForPrimary};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.dangerousHover};
    }
  `,
  default: css`
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surface};
    }
  `,
  outlined: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.textForPrimary};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceAlt};
    }
  `,
} satisfies Record<ButtonVariant, RuleSet>;

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.font.size.base};
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  ${({ variant = 'default' }) => variantStyles[variant]}

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.textDisabled};
    cursor: not-allowed;
    border: none;
  }
`;
