import { css } from 'styled-components';

export const theme = {
  colors: {
    background: '#f9f9fb',
    surface: '#ffffff',
    surfaceAlt: '#f0f0f3',
    primary: '#7700ff',
    primaryHover: '#4e00cc',
    dangerousHover: '#ce3340',
    textForPrimary: '#fff',
    textPrimary: '#1c1e21',
    textSecondary: '#6b6b6b',
    textDisabled: '#a0a0a0',
    disabled: '#ccc',
    dangerous: '#e63946',
    error: '#e63946',
    border: '#e0e0e0',
    scrollThumb: 'rgba(0, 0, 0, 0.15)',
    holiday: '#e5eaf1',
    taskBg: 'white',
    todayBorder: '#6f00ff',
    shadow: 'rgba(0, 0, 0, 0.05)',
    overlayBG: 'rgba(0, 0, 0, 0.5)',
    inputFocusBG: '#f9f9f9',
  },

  font: {
    family: '\'Segoe UI\', Roboto, \'Helvetica Neue\', sans-serif',
    size: {
      sm: '0.85rem',
      base: '1rem',
      lg: '1.25rem',
    },
    weight: {
      regular: 400,
      medium: 500,
      bold: 600,
    },
  },

  spacing: (multiplier: number = 1) => `${0.5 * multiplier}rem`,

  sizes: {
    calendarHeaderHeight: '50px',
    calendarDaysHeigh: '35px',
    calendarHeight: 'calc(100% - 35px - 50px)',
  },

  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },

  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 10px rgba(0,0,0,0.07)',
  },

  zIndex: {
    modal: 1000,
    dropdown: 900,
    overlay: 800,
  },

  maxLines(linesAmount: number) {
    return css`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${linesAmount};
      line-clamp: ${linesAmount};
      -webkit-box-orient: vertical;
    `;
  },
};

export const commonStyles = {
  scroll: css`
    overflow-y: auto;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        width: 8px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${theme.colors.scrollThumb};
        border-radius: 4px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
  `,
} as const;


