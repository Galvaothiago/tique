// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { collection, getDocs, doc, where, query } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const user_id = req.query.test

  console.log(user_id);
  const getData = async () => {
    // const querySnapshot = await getDocs(collection(db, "users"));
    
    const q = query(collection(db, "bets"), where("id_user", "==", "0QnvoNdJLnbLNv5Im9fmoTW1BZ32"));
    const docs = await getDocs(q);

    docs.forEach((doc) => {
      console.log(doc.data());
    })

  }

  getData()
  res.status(200).json({})

}
