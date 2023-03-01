import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function ImportTaximailContact(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { listId, email, firstname, lastname, TAXI_MAIL_SESSION_ID } = req.body;
    const response = await axios.post(
      `https://api.taximail.com/v2/list/${listId}/subscribers/import`,
      {
        mode_import: "copyandpaste",
        subscribers_data: `${email},${firstname},${lastname}`,
        field_terminator: ",",
        matched_fields: ["email", "CF_Firstname", "CF_Lastname"],
        update_duplicates: true,
        not_send_optin_email: true,
        add_to_suppression_list: "none",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TAXI_MAIL_SESSION_ID}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while importing subscribers." });
  }
}
