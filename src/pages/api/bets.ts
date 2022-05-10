// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDoc, doc } from "firebase/firestore";
import db from "../../../firebase";



export default function handler(req, res) {
  const getData = async () => {
    // const querySnapshot = await getDocs(collection(db, "users"));

    const docRef = doc(db, "users", "ck1rGRUl8tFXsDG8hmy4");
    const docRef1 = doc(db, "bets", "raSHdAssrDOZdVCxEQiA")
  const docSnap = await getDoc(docRef1);
    // console.log(querySnapshot)
    // const docRef = doc(db, "users", "uid");
    // const docSnap = await getDoc(docRef);
    
    console.log(docRef1.id);
    console.log(docSnap.data());
  //   querySnapshot.forEach((doc) => {
  //     // data.push(doc.id)
  //     console.log(doc.data());
  //   });
  // }
  }

  getData()
  res.status(200).json({ name: 'Thiago' })
}
