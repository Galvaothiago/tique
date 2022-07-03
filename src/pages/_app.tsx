import Head from "next/head"
import { BetsProvider } from "../context/BetsContext"
import { CompareBetsProvider } from "../context/CompareBestContext"

import { UserProvider } from "../context/UserContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mega Tique</title>
      </Head>

      <BetsProvider>
        <UserProvider>
          <CompareBetsProvider>
            <Component {...pageProps} />
          </CompareBetsProvider>
        </UserProvider>
      </BetsProvider>
    </>
  )
}

export default MyApp
