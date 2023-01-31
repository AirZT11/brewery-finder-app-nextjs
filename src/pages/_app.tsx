import "../styles/globals.css"
import type { AppProps } from "next/app"
// import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
// import { SessionContextProvider, Session } from "@supabase/auth-helpers-react"
import { useState } from "react"
import "mapbox-gl/dist/mapbox-gl.css"

const { wrapper } = require("../store/store")

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
    <Component {...pageProps} />
    // </SessionContextProvider>
  )
}

export default wrapper.withRedux(MyApp)
