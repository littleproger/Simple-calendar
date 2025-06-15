import 'styled-components';
import { type theme } from './commonStyles';

type ThemeType = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType{} // eslint-disable-line
}
