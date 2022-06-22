import { createContext, ReactNode, useEffect, useState } from "react";
import { signInWithGoogle, signInWithCredentials } from "../authFirebase";
import { signOut } from 'firebase/auth'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { auth } from "../../firebase";

interface ChildrenProp {
    children: ReactNode
}

interface CredentialsProps {
    email: string,
    password: string
}

export interface User {
    id: string,
    name: string,
    email: string,
    imgProfile: string
}

interface UserContextProps {
    user: User,
    login: () => void,
    loginWithCredentials: (data: CredentialsProps) => void
    logout: () => void,
    removeErrorMessage: () => void
    error: string
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: ChildrenProp) {
    const [ user, setUser ] = useState<User | null >(null)
    const [ error, setError ] = useState<string | null>(null)

    const setCookieUserInfo = (user: User) => {
        setCookie(null, 'userTique', JSON.stringify(user), {
            maxAge: 60 * 60 * 24 * 5, // 5 days
            path: '/'
        })
    }

    const login = async () => {
        try {
            const user = await signInWithGoogle()
            
            const data = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                imgProfile: user.photoURL
            }
            setUser(data)
            setCookieUserInfo(data)

        } catch(err) {
            console.log(err)
            alert(err)
        }
    }

    const loginWithCredentials = async (credentials: CredentialsProps) => {
        const { email, password } = credentials

        try {
            const { user, errorMessage, errorCode } = await signInWithCredentials(email, password)

            if(errorMessage) setError(errorMessage)

            setUser(user)
            setCookieUserInfo(user)

        } catch(err) {
            console.log(err)
        }

    }

    const logout = async () => {
       await signOut(auth);
       setUser(null)

       destroyCookie(null, 'userTique')
    }

    const removeErrorMessage = () => {
        setError(null)
    }

    useEffect(() => {
        const { userTique } = parseCookies()
        const persistedUser = JSON.parse(userTique)

        setUser(persistedUser)
    }, [])

    return (
        <UserContext.Provider
            value={{
                login,
                loginWithCredentials,
                logout,
                removeErrorMessage,
                user,
                error
            }}
        >
        { children }
        </UserContext.Provider>
    )
}