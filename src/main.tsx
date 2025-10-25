import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import App from "./App";
import { SettingsProvider } from "./context/SettingsContext";
import { ClockProvider } from "./context/ClockContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <SettingsProvider>
        <ClockProvider>
          <App />
        </ClockProvider>
      </SettingsProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
