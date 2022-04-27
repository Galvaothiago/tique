import { ModalProvide } from '../context/ModalContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ModalProvide>
        <Component {...pageProps} />
      </ModalProvide>
    </>
  ) 
}

export default MyApp
