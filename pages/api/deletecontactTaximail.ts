import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { listID, sessionID } = req.body;
    const response = await axios.delete(
      `https://api.taximail.com/v2/list/${listID}/subscribers/selection/${sessionID}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
}
