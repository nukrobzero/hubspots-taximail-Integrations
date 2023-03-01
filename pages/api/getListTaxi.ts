import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function GetListTaxi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {TAXI_MAIL_SESSION_ID} = req.query;
    const response = await axios.get("https://api.taximail.com/v2/list/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TAXI_MAIL_SESSION_ID}`,
      },
    });
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the contacts." });
  }
}
