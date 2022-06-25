import '../../styles/globals.css'
// import 'preline'
import { ChakraProvider } from '@chakra-ui/react'
import appTheme from '../../Helpers/_theme'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={appTheme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
