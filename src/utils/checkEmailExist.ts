import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../firebase";

export const checkEmailExist = async (email: string) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const docs = await getDocs(q);

    if(docs.docs.length !== 0) {
        return true
    }
    return false
}