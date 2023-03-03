import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function ImportTaximailContact(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { listId, email, firstname, lastname, TAXI_MAIL_SESSION_ID } =
      req.body;

    const requestData = {
      mode_import: "copyandpaste",
      subscribers_data: `${email},${firstname},${lastname}`,
      field_terminator: ",",
      matched_fields: ["email", "Firstname", "Lastname"],
      not_send_optin_email: true,
      add_to_suppression_list: "none",
    };

    console.log("Data in the request body:", requestData);

    const response = await fetch(
      `https://api.taximail.com/v2/list/${listId}/subscribers/import`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TAXI_MAIL_SESSION_ID}`,
        },
        body: JSON.stringify(requestData),
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while importing subscribers." });
  }
}
