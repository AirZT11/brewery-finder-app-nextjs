import Head from "next/head"
// import Image from "next/image"
// import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.css"
import { Heading } from "@chakra-ui/react"

// const inter = Inter({ subsets: ["latin"] })

export default function Home() {
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
