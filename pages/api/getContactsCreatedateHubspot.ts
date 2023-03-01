import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getContactsCreatedateHubspot(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const limit = 100;
    const after = undefined;
    const properties = ["email", "firstname", "lastname", "phone"];
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;
    const filter = `email:not_empty`;

    const hubspotResponse = await axios.get(
      "https://api.hubapi.com/crm/v3/objects/contacts",
      {
        params: {
          limit,
          after,
          properties,
          propertiesWithHistory,
          associations,
          archived,
          filter,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
        },
      }
    );
    const subscribersData = hubspotResponse.data.results
      .map((result: any) => {
        const email = result.properties.email || "[No email]";
        const firstname = result.properties.firstname || "";
        const lastname = result.properties.lastname || "";
        const phone = result.properties.phone || "";
        return `${email},${firstname},${lastname},${phone}`;
      })
      .join("|:|");

    // Import data into Taximail
    const listId = "1";
    const response = await axios.post(
      `https://api.taximail.com/v2/list/${listId}/subscribers/import`,
      {
        mode_import: "copyandpaste",
        subscribers_data: subscribersData,
        field_terminator: ",",
        matched_fields: ["email", "CF_Firstname", "CF_Lastname", "CF_tel"],
        update_duplicates: true,
        not_send_optin_email: true,
        add_to_suppression_list: "none",
      },
      {
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
