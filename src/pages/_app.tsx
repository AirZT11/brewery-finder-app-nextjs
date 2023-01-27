import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
const { wrapper } = require("../store/store")

export function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
