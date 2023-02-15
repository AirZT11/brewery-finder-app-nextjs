import "../styles/globals.css"
import type { AppProps } from "next/app"
// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
// import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"
import { useState } from "react"
import "mapbox-gl/dist/mapbox-gl.css"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
const { wrapper } = require("../store/store")

const colors = {
  background: {
    100: "rgb(243, 243, 243)",
    200: "rgb(247, 247, 247)",
    300: "rgb(218, 218, 218)",
  },
}

const theme = extendTheme({ colors })

// TODO: Set up Auth Supabase

export function MyApp(
  { Component, pageProps }: AppProps /* <{
  initialSession: Session
}> */
) {
  // const [supabase] = useState(() => createBrowserSupabaseClient())
  return (
    // <SessionContextProvider
    //   supabaseClient={supabase}
    //   initialSession={pageProps.initialSession}
    // >
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </SessionContextProvider>
  )
}

export default wrapper.withRedux(MyApp)
