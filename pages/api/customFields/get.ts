import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function PostCF(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { sessionID, listID } = req.body;
    const response = await axios.get(
      `https://api.taximail.com/v2/list/${listID}/custom_fields`,
      {
        params: {
          order_by: "custom_field_id",
          order_type: "desc",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionID}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while getting the contacts." });
  }
}
