import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      bg: { default: "gray.50", _dark: "gray.900" },
      text: { default: "gray.900", _dark: "gray.100" },
      border: { default: "gray.900", _dark: "whiteAlpha.600" },
      muted: { default: "gray.600", _dark: "gray.400" },
      card: { default: "white", _dark: "whiteAlpha.300" },
      cardBorder: { default: "blackAlpha.300", _dark: "whiteAlpha.300" },
      gaugeFill: { default: "red.600", _dark: "red.500" },
    },
  },
  styles: {
    global: {
      body: {
        bg: "bg",
        color: "text",
        transition: "background-color 0.2s, color 0.2s",
      },
    },
  },
});

export default theme;
