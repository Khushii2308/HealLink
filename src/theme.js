// src/theme.js
import { createTheme } from "@mui/material/styles";

const commonTypography = {
  fontFamily: "'Inter', 'Roboto', sans-serif",
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FAFAFA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#555555",
    },
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#FF6F61",
    },
  },
  typography: commonTypography,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#BDBDBD",
    },
    primary: {
      main: "#90CAF9",
    },
    secondary: {
      main: "#FF8A65",
    },
  },
  typography: commonTypography,
});
