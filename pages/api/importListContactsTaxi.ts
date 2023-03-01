import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function importListContactsTaxi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { taxi_mail_session_id } = req.body;
    const response = await axios.post(
      "https://api.taximail.com/v2/list",
      {
        create_mode: "active",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${taxi_mail_session_id}`,
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the contacts." });
  }
}
