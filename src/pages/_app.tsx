import { BetsProvider } from '../context/BetsContext'
import { ModalProvide } from '../context/ModalContext'
import { UserProvider } from '../context/UserCOntext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <BetsProvider>
          <ModalProvide>
            <Component {...pageProps} />
          </ModalProvide>
        </BetsProvider>
      </UserProvider>
    </>
  ) 
}

export default MyApp
