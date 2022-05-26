import { createContext, ReactNode, useState } from "react";
import { signInWithGoogleOrFacebook } from "../authFirebase";
import { signOut } from 'firebase/auth'
import { auth } from "../../firebase";

interface ChildrenProp {
    children: ReactNode
}

interface User {
    id: string,
    name: string,
    email: string,
    imgProfile: string
}

interface UserContextProps {
    user: User,
    login: (typeProvider: string) => void,
    logout: () => void
}

export const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: ChildrenProp) {
    const [ user, setUser ] = useState<User | null >(null)

    const login = async (typeProvider: string) => {
        try {
            const user = await signInWithGoogleOrFacebook(typeProvider)
            
            setUser({
                id: user.uid,
                name: user.displayName,
                email: user.email,
                imgProfile: user.photoURL
            })

        } catch(err) {
            console.log(err)
            alert(err)
        }
    }

    const logout = async () => {
       await signOut(auth);
       setUser(null)
        
    }

    return (
        <UserContext.Provider
            value={{
                login,
                logout,
                user
            }}
        >
        { children }
        </UserContext.Provider>
    )
}