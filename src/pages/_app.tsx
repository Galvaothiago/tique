import Head from "next/head"
import { BetsProvider } from "../context/BetsContext"
import { CompareBetsProvider } from "../context/CompareBestContext"
import { ModalProvide } from "../context/ModalContext"
import { UserProvider } from "../context/UserContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mega Tique</title>
      </Head>
      <ModalProvide>
        <UserProvider>
          <BetsProvider>
            <CompareBetsProvider>
              <Component {...pageProps} />
            </CompareBetsProvider>
          </BetsProvider>
        </UserProvider>
      </ModalProvide>
    </>
  )
}

export default MyApp
