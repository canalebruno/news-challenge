import {extendTheme} from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.800',
        color: 'white'
      },
      h1: {
        fontSize:"3rem"
      },
      h2: {
        fontSize:"2rem",
      },
    }
  }
})