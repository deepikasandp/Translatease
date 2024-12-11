import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from "@mui/material/styles";
//import i18n from "./i18n";
//import { I18nextProvider } from "react-i18next"; 

const theme = createTheme({
  spacing: 8, // Default spacing multiplier
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);

