import { 
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword, 
    UserCredential,
    createUserWithEmailAndPassword} from "firebase/auth";
import { query, getDocs, collection, where, addDoc, setDoc, doc } from "firebase/firestore";

import db, { auth } from "../firebase";
import { User } from "./context/UserContext";

interface NewUserProp {
    email: string,
    name: string,
    password: string
}

const googleProvider = new GoogleAuthProvider();

const emailAlreadyExist = async (userId: string) => {
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const docs = await getDocs(q);

    if(docs.docs.length !== 0) {
        return true
    }
    return false
}

const signInWithGoogle = async () => {
    
    try {
        const response = await signInWithPopup(auth, googleProvider);
        
        const user = response.user;
        
        const userAlreadyExists = emailAlreadyExist(user.uid)
        
        
        if (!userAlreadyExists) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'Google',
                email: user.email,
            });
        }

        return user;

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithCredentials = async (email: string, password: string) => {
    let errorMessage = null
    let errorCode = null
    let userCredential: UserCredential

    let user: User

    let canChangeUser = true

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        userCredential = userCredentials

        const typeUser = userCredential.user.providerData

        if(typeUser[0].providerId === 'password') {

            const userId = userCredential.user.uid

            const q = query(collection(db, "users"), where("uid", "==", userId));


            const userData = await getDocs(q)

            userData.forEach(userInfo => {
                canChangeUser = false

                const userName = userInfo.data().name

                user = {
                    id: userCredential.user.uid,
                    email: userCredential.user.email,
                    imgProfile: userCredential.user.photoURL,
                    name: userName
                }
            })
        }

        if(canChangeUser) {
            user = {
                id: userCredential.user.uid,
                email: userCredential.user.email,
                imgProfile: userCredential.user.photoURL,
                name: userCredential.user.displayName
            }
        }

        canChangeUser = true
    } catch(err) {
        errorMessage = err.message
        errorCode = err.code
    }
    
    console.log()
    return { user, errorMessage, errorCode }

}

const createAccountCredentials = async (newUser: NewUserProp) => {
    const password = newUser.password
    const email = newUser.email
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        console.log(user.providerData)
        const userAlreadyExist = await emailAlreadyExist(user.uid)

        if(!userAlreadyExist) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: newUser.name,
                authProvider: 'Login and Password',
                email: user.email,
            });
        }

        return user

    } catch(err) {
        console.log(err)
        alert(err.message)
    }
}

// createUserWithEmailAndPassword()
export { signInWithGoogle, signInWithCredentials, createAccountCredentials }