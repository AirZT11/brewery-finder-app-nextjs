import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"
import { useState } from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { MapProvider } from "react-map-gl"
import theme from "../theme"
const { wrapper } = require("../store/store")
import "@fontsource/raleway/400.css"
import "@fontsource/lobster-two/700.css"
import Head from "next/head"

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <MapProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </MapProvider>
    </SessionContextProvider>
  )
}

export default wrapper.withRedux(MyApp)
