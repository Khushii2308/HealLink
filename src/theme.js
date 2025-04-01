import { createTheme } from "@mui/material/styles";

const commonTypography = {
  fontFamily: "'Gilroy', 'Inter', 'Roboto', sans-serif",
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0057FF", 
    },
    green: {
      main: "#4CAF50"
    },
    secondary: {
      main: "#24C6E0", 
    },
    background: {
      default: "#EEF7FF",  
      paper: "#FFFFFF",    
    },
    text: {
      primary: "#0F1E51", 
      secondary: "#152463",  
    },
  },
  typography: commonTypography,
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7DB3FF",  
    },
    green: {
      main: "#4CAF50"
    },
    secondary: {
      main: "#24C6E0",  
    },
    background: {
      default: "#0F1E51", 
      paper: "#152463",   
    },
    text: {
      primary: "#EEF7FF",  
      secondary: "#7DB3FF",  
    },
  },
  typography: commonTypography,
});
