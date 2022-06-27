// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { NextApiRequest, NextApiResponse } from "next"
import db from "../../../firebase"

const STATUS_OK = 200
const STATUS_NOT_FOUND = 404
const STATUS_NO_CONTENT = 204
const STATUS_CREATED = 201
const STATUS_BAD_REQUEST = 400

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId

  if (req.method === "GET") {
    try {
      const q = query(
        collection(db, "bets_results"),
        where("user_id", "==", userId)
      )
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
    const { userId } = req.body.params

    try {
      const q = query(
        collection(db, "bets_results"),
        where("user_id", "==", userId)
      )
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        await addDoc(collection(db, "bets_results"), {
          date: new Date().toISOString(),
          result: "1 - 9 - 25 - 27 - 30 - 56",
          user_id: userId,
        })

        return res.status(STATUS_CREATED)
      }

      return res.status(STATUS_NO_CONTENT)
    } catch (err) {
      console.log(err.message)
    }
  }

  if (req.method === "PUT") {
    const { result } = req.body.data
    const { userId } = req.body.params

    try {
      const q = query(
        collection(db, "bets_results"),
        where("user_id", "==", userId)
      )
      const docs = await getDocs(q)

      if (docs.docs.length !== 0) {
        const dataRef = docs.docs[0].ref

        await updateDoc(dataRef, {
          result: result,
          date: new Date().toISOString(),
        })

        return res.status(STATUS_NO_CONTENT)
      }

      return res.status(STATUS_NOT_FOUND).json({})
    } catch (err) {
      console.log(err.message)
    }
  }
}
