import { createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#1B82A8',
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: '#FF0100',
    },
  },
});

export default lightTheme;
