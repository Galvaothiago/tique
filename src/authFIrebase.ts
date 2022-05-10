import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";

import db, { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider()

const signInWithGoogleOrFacebook= async (typeProvider: string = 'google') => {
    let provider = googleProvider

    switch (typeProvider) {
        case 'google':
            provider = googleProvider
            break
        case 'facebook':
            provider = facebookProvider
            break
        default:
            provider = googleProvider
    }

    try {
        const response = await signInWithPopup(auth, provider);

        const user = response.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);

        console.log(user)
        if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: typeProvider,
            email: user.email,
        });
        }

        return user;

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export { signInWithGoogleOrFacebook }