import { extendTheme } from "@chakra-ui/react"
import styles from "./styles"

const theme = extendTheme({
  ...styles,
  // fonts: {
  //   heading: `'Lobster Two', sans-serif`,
  //   body: `'Bebas Neue', sans-serif`,
  // },
  components: {},
})

export default theme
