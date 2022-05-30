import { createContext, ReactNode, useState } from "react";
import { signInWithGoogle, signInWithCredentials } from "../authFirebase";
import { signOut, UserCredential } from 'firebase/auth'
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

    const login = async () => {
        try {
            const user = await signInWithGoogle()
            
            setUser({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                imgProfile: user.photoURL
            })

            console.log(user)

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
            console.log(user, errorCode, errorMessage)

        } catch(err) {
            console.log(err)
        }

    }

    const logout = async () => {
       await signOut(auth);
       setUser(null)
        
    }

    const removeErrorMessage = () => {
        setError(null)
    }

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