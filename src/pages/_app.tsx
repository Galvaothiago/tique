import { BetsProvider } from '../context/BetsContext'
import { ModalProvide } from '../context/ModalContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <BetsProvider>
        <ModalProvide>
          <Component {...pageProps} />
        </ModalProvide>
      </BetsProvider>
    </>
  ) 
}

export default MyApp
