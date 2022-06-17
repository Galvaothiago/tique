// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, where, query, addDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId
  const STATUS_OK = 200

  if(req.method === 'GET') {
    try {
      const q = query(collection(db, "bets"), where("id_user", "==", userId));
      const docs = await getDocs(q);

      const dataResults = []
      console.log("test api")
      if(docs.docs.length !== 0) {

        docs.docs.forEach(doc => {
          const dataRefId = doc.id

          const data = {
            ...doc.data(),
            dataRefId
          }

          dataResults.push(data)
        })

        
        return res.status(STATUS_OK).json(dataResults)
      }

      return res.status(404).json({ message: "NOT FOUND" })

    } catch(err) {
      console.log(err.message)
    }
  }

  if(req.method === 'POST') {
    const data = req.body

    try {
      const betRef = await addDoc(collection(db, "bets"), data)
      
      res.status(STATUS_OK).json({ id: betRef.id})

    } catch(err) {
      console.log(err.message)
    }

  }

  if(req.method === 'PUT') {

    const data = req.body

    try {
      const q = query(collection(db, "bets"), where("id_user", "==", data.params.userId));
      const docs = await getDocs(q);
      const dataRef = docs.docs[0].ref

      if(docs.docs.length !== 0) {
        await updateDoc(dataRef, {
          "bet_result.date": (new Date()).toISOString(),
          "bet_result.result": data.body.bet_result.result
        })

        return res.status(204)
      }

    } catch(err) {
      console.log(err.message)
    }
  }

}
