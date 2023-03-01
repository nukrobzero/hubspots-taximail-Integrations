import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function ImportTaximailContact(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //get value from submit
  const { listId, TAXI_MAIL_SESSION_ID, HUBSPOT_KEY } = req.body;
  // Fetch data from HubSpot API
  async function getContacts() {
    const url = `https://api.hubapi.com/crm/v3/objects/contacts`;
    const headers = {
      Authorization: `Bearer ${HUBSPOT_KEY}`,
    };
    const params: {
      property: string[];
      after?: string;
    } = {
      property: ["email", "firstname", "lastname", "phone"],
    };
    let allContacts: {
      properties: {
        email?: { value?: string };
        firstname?: { value?: string };
        lastname?: { value?: string };
        phone?: { value?: string };
      };
    }[] = [];
    let after: string | undefined;
    do {
      if (after) {
        params.after = after;
      }
      const response = await axios.get(url, { headers, params });
      const { results, paging } = response.data;
      allContacts.push(...results);
      after = paging?.next?.after;
    } while (after);
    return allContacts;
  }
  try {
    // Convert fetched data to Taximail-compatible format
    const subscribersData = (await getContacts())
      .map((result: any) => {
        const email = result.properties.email || "[No email]";
        const firstname = result.properties.firstname || "";
        const lastname = result.properties.lastname || "";
        const phone = result.properties.phone || "";
        return `${email},${firstname},${lastname},${phone}`;
      })
      .join("|:|");

    // Import data into Taximail
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
          Authorization: `Bearer ${TAXI_MAIL_SESSION_ID}`,
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while importing subscribers." });
  }
}
