import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { SettingsProvider } from "./context/SettingsContext";
import { ClockProvider } from "./context/ClockContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <SettingsProvider>
        <ClockProvider>
          <App />
        </ClockProvider>
      </SettingsProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
