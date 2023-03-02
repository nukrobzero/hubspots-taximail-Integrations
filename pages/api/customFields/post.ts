import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function PostCF(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {sessionID, listID} = req.body;
    const response = await axios.post(
      `https://api.taximail.com/v2/list/${listID}/custom_fields`,
      {
        field_name: "Firstname",
        field_key: "Firstname",
        field_type: "TEXT",
        field_value: "256",
        validation_method: "Disabled",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionID}`,
        },
      }
    );

    const response1 = await axios.post(
      `https://api.taximail.com/v2/list/${listID}/custom_fields`,
      {
        field_name: "Lastname",
        field_key: "Lastname",
        field_type: "TEXT",
        field_value: "256",
        validation_method: "Disabled",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionID}`,
        },
      }
    );
    res.json(response.data);
    res.json(response1.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while getting the contacts." });
  }
}
