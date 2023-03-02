import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getContactsHubspot(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const limit = 10;
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
          Authorization: `Bearer pat-na1-4aa0abe2-6254-45f5-a34c-475b07263fb8`,
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

    console.log(subscribersData);
    res.json(subscribersData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the contacts." });
  }
}
