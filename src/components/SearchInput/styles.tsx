import styled, { css } from 'styled-components';
import { Input as DefaultInput } from '../Input';

export const Wrapper = styled.div(({ theme })=>css`
  position: relative;
  display: flex;
  align-items: center;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  padding: 0.5rem 0.75rem;
  width: 100%;
  max-width: 320px;

  &&:has(input:focus){
    border: 1px solid ${theme.colors.primary};
  }

  .icon {
    color: ${theme.colors.textSecondary};
    pointer-events: none;
  }

  .icon.search {
    margin-right: 0.5rem;
  }

  .icon.clear {
    pointer-events: auto;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${theme.colors.textPrimary};
    }
  }
`);

export const Input = styled(DefaultInput)`
  flex: 1;
`;

export const ClearButton = styled.button<{$shown: boolean}>`
  background: transparent;
  border: none;
  padding: 0;
  margin-left: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: ${({ $shown })=>$shown ? 'visible' : 'hidden'};
`;
