import { 
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword } from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";

import db, { auth } from "../firebase";


const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {

    try {
        const response = await signInWithPopup(auth, googleProvider);

        const user = response.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
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
    let user = {}

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        user = userCredentials.user
    } catch(err) {
        errorMessage = err.message
        errorCode = err.code
    }

    return { user, errorMessage, errorCode }

}


export { signInWithGoogle, signInWithCredentials }