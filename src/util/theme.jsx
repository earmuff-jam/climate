import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F72AF',
      dark: '#112D4E',
    },
    secondary: {
      main: '#DBE2EF',
      light: '#F9F7F7',
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
    h1: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.5,
    },
    h5: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.6,
    },
    h6: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body1: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
});

export default theme;