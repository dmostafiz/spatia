import '../../styles/globals.css'
// import 'preline'
import { ChakraProvider } from '@chakra-ui/react'
import appTheme from '../../Helpers/_theme'
import axios from 'axios'
import useToken from './../Hooks/useToken';

axios.defaults.baseURL = "http://localhost:3000/api"

function MyApp({ Component, pageProps }) {

  axios.defaults.headers.common['Authorization'] = useToken();
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  
  return <ChakraProvider theme={appTheme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
