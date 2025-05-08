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
  styles: {
    global: (props) => ({
      body: {
        transition: 'background-color 0.2s, color 0.2s',
      },
    }),
  },
});

export default theme;