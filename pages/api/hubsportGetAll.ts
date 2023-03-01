import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

async function getContacts() {
  const url = `https://api.hubapi.com/crm/v3/objects/contacts`;
  const headers = {
    Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
  };
  const params: {
    property: string[];
    after?: string;
  } = {
    property: ["email", "firstname", "lastname"],
  };
  let allContacts: { email: string; firstname: string; lastname: string }[] =
    [];
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

export default async function hubsportGetAllContacts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving contacts");
  }
}
