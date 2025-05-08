import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: '#f7fafc',
    },
  },
});

export default theme;