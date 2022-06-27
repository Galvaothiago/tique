// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../firebase"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId
  const STATUS_OK = 200
  const STATUS_CREATED = 201
  const STATUS_NO_CONTENT = 204
  const STATUS_NOT_FOUND = 404
  const STATUS_BAD_REQUEST = 400
  const STATUS_UNAUTHORIZED = 401

  if (req.method === "GET") {
    try {
      const q = query(collection(db, "bets"), where("id_user", "==", userId))
      const docs = await getDocs(q)

      const dataResults = []
      if (docs.docs.length !== 0) {
        docs.docs.forEach((doc) => {
          const dataRefId = doc.id

          const data = {
            ...doc.data(),
            dataRefId,
          }

          dataResults.push(data)
        })

        return res.status(STATUS_OK).json(dataResults)
      }

      return res.status(STATUS_NOT_FOUND).json({ message: "NOT FOUND" })
    } catch (err) {
      console.log(err.message)
    }
  }

  if (req.method === "POST") {
    const data = req.body

    try {
      if (!data) {
        res.status(STATUS_BAD_REQUEST)
      }
      const betRef = await addDoc(collection(db, "bets"), data)

      res.status(STATUS_CREATED).json({ id: betRef.id })
    } catch (err) {
      res.status(STATUS_BAD_REQUEST)
      console.log(err.message)
    }
  }

  if (req.method === "PUT") {
    const data = req.body

    try {
      const q = query(
        collection(db, "bets"),
        where("id_user", "==", data.params.userId)
      )
      const docs = await getDocs(q)
      const dataRef = docs.docs[0].ref

      if (docs.docs.length !== 0) {
        await updateDoc(dataRef, {
          "bet_result.date": new Date().toISOString(),
          "bet_result.result": data.body.bet_result.result,
        })

        return res.status(STATUS_NO_CONTENT).json({})
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  if (req.method === "PATCH") {
    const betRef = String(req.body.betRef)
    const bets = req.body.data

    try {
      const docRef = doc(db, "bets", betRef)
      await updateDoc(docRef, {
        my_bets: bets,
      })

      return res.status(STATUS_NO_CONTENT).json({})
    } catch (err) {
      console.log(err)
      return res.status(STATUS_BAD_REQUEST).json({})
    }
  }

  if (req.method === "DELETE") {
    const betRef = req.body.betRef
    const userId = req.body.userId

    try {
      if (!userId) return res.status(STATUS_UNAUTHORIZED).json({})

      const docRef = doc(db, "bets", betRef)
      const docSnap = await getDoc(docRef)

      if (docSnap.data().id_user !== userId) {
        return res.status(STATUS_UNAUTHORIZED).json({})
      }

      await deleteDoc(docRef)
      return res.status(STATUS_NO_CONTENT)
    } catch (err) {
      console.log(err)
    }
  }
}
