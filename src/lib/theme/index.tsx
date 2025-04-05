import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { typography, shadows, shape } from './themePrimitives';

interface AppThemeProps {
  children: React.ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents } = props;

  // Создаем темную тему
  const theme = React.useMemo(() => {
    if (disableCustomTheme) {
      return createTheme();
    }

    return createTheme({
      palette: {
        mode: 'dark', // Устанавливаем темную тему
        primary: {
          main: '#90caf9', // Пример цвета для темной темы
        },
        background: {
          default: '#121212', // Темный фон
          paper: '#1e1e1e', // Цвет для элементов, таких как карточки
        },
        text: {
          primary: '#ffffff', // Белый текст
          secondary: '#b3b3b3', // Серый текст
        },
      },
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [disableCustomTheme, themeComponents]);

  // Если кастомная тема отключена, возвращаем детей без ThemeProvider
  if (disableCustomTheme) {
    return children;
  }

  // Возвращаем ThemeProvider с темной темой
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
