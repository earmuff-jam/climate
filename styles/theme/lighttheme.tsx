import { createTheme } from "@mui/material/styles";

const primary_main_color = '#1B82A8';
const secondary_main_color = '#19857b';
const error_main_color = '#FF0100';

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primary_main_color,
    },
    secondary: {
      main: secondary_main_color,
    },
    error: {
      main: error_main_color,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  }
});

export default lightTheme;
