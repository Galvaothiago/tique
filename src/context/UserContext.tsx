import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { signInWithGoogle, signInWithCredentials, resetPasswordByEmail } from "../authFirebase"
import { signOut } from "firebase/auth"
import { setCookie, parseCookies, destroyCookie } from "nookies"
import { auth } from "../../firebase"

import { BetsContext } from "./BetsContext"

interface ChildrenProp {
  children: ReactNode
}

interface CredentialsProps {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  imgProfile: string
}

interface UserContextProps {
  user: User
  login: () => void
  loginWithCredentials: (data: CredentialsProps) => void
  logout: () => void
  removeErrorMessage: () => void
  error: string
  handleResetPasswordByEmail: (email: string) => void
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: ChildrenProp) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { openModalAndCloseAutomatically } = useContext(BetsContext)

  const setCookieUserInfo = (user: User) => {
    setCookie(null, "userTique", JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 5, // 5 days
      path: "/",
    })
  }

  const login = async () => {
    try {
      const user = await signInWithGoogle()

      const data = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        imgProfile: user.photoURL,
      }
      setUser(data)
      setCookieUserInfo(data)
    } catch (err) {
      openModalAndCloseAutomatically(err.message, "fail")
    }
  }

  const loginWithCredentials = async (credentials: CredentialsProps) => {
    const { email, password } = credentials

    try {
      const { user, errorMessage, errorCode } = await signInWithCredentials(email, password)

      if (errorMessage) setError(errorMessage)

      setUser(user)
      setCookieUserInfo(user)
    } catch (err) {
      openModalAndCloseAutomatically(err.message, "fail")
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)

    destroyCookie(null, "userTique")
  }

  const removeErrorMessage = () => {
    setError(null)
  }

  const handleResetPasswordByEmail = (email?: string) => {
    try {
      if (!email) {
        openModalAndCloseAutomatically("Insira seu email e solicite o reset da senha!", "fail")
        return
      }
      resetPasswordByEmail(email)
      openModalAndCloseAutomatically("Enviado instruções para reset de sua senha!", "success")
    } catch (err) {
      openModalAndCloseAutomatically("Não foi possivel enviar o email, tente novamente mais tarde!", "fail")
    }
  }
  useEffect(() => {
    const { userTique } = parseCookies()

    if (!!userTique) {
      const persistedUser = JSON.parse(userTique)
      setUser(persistedUser)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        login,
        loginWithCredentials,
        logout,
        removeErrorMessage,
        user,
        error,
        handleResetPasswordByEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
