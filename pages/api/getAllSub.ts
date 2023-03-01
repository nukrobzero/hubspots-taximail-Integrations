import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getAllSub(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const list_id = "1";
    const response = await axios.get(
      `https://api.taximail.com/v2/list/${list_id}/subscribers`,
      {
        params: {
          display_mode: "all",
          order_by: "email",
          order_type: "desc",
          page: "1",
          limit: "100",
          keyword_search: "",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TAXI_MAIL_SESSION_ID}`,
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
