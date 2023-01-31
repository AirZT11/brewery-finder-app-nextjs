import Head from "next/head"
import styles from "../styles/Home.module.css"
import { Heading } from "@chakra-ui/react"
import { Auth, ThemeSupa } from "@supabase/auth-ui-react"
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react"

export default function Home() {
  // TODO: Supbase Auth
  // const session = useSession()
  // const supabase = useSupabaseClient()
  return (
    <>
      <Head>
        <title>Brewery Finder App</title>
        <meta name="description" content="Brewery Finder App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Heading>Welcome to the Brewery Finder</Heading>
      </main>
    </>
  )
}
