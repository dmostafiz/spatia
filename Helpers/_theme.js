import { extendTheme } from "@chakra-ui/react";

const appTheme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#ffffff',
        color: '#474652',
        // FontFace: ''
      },

      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },

  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
    link: {
      hover: '#322423'
    }
  },

  fonts: {
    heading: `'Josefin Sans', sans-serif`,
    body: `'Josefin Sans', sans-serif`,
  },

})

export default appTheme