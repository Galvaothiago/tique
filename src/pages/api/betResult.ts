// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId
  const STATUS_OK = 200

  if(req.method === 'GET') {
    try {
      const q = query(collection(db, "bets_results"), where("user_id", "==", userId));
      const docs = await getDocs(q);

      const dataResults = []
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

    if(req.method === 'PUT') {

    const { result } = req.body.data
    const { userId } = req.body.params

    console.log(result)
    try {
      const q = query(collection(db, "bets_results"), where("user_id", "==", userId));
      const docs = await getDocs(q);
      
      
      if(docs.docs.length !== 0) {
        const dataRef = docs.docs[0].ref

        await updateDoc(dataRef, {
          "result": result,
          "date": (new Date()).toISOString()
        })

        return res.status(204).json({})
      }

      return res.status(404).json({})

    } catch(err) {
      console.log(err.message)
    }
  }
}
