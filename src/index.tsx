import React from "react";
import ReactDOM from "react-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import "@fontsource/roboto";

import theme from "./theme";

import "./index.css";
import App from "./App";
import { GMNProvider } from "./GMNProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Suspense fallback={<div>Loading... </div>}>
        <GMNProvider>
          <App />
        </GMNProvider>
      </React.Suspense>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
