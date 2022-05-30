// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, doc, where, query, addDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId
  const STATUS_OK = 200

  if(req.method === 'GET') {
    const q = query(collection(db, "bets"), where("id_user", "==", userId));
    const docs = await getDocs(q);

    const data = docs.docs[0].data()
  
    res.status(STATUS_OK).json(data)
    return
  }

  if(req.method === 'POST') {
    const data = req.body

    console.log(data)

    const betRef = await addDoc(collection(db, "bets"), data)
    
    res.status(STATUS_OK).json({ id: betRef.id})
  }

  if(req.method === 'PUT') {
    const userId = req.query.userId

    // const betsUser = doc(db, "bets", userId)
  }

}
