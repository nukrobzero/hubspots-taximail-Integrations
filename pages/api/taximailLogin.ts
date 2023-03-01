import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function TaximailLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { api_key, secret_key } = req.body;
    const response = await axios.post(
      "https://api.taximail.com/v2/user/login",
      {
        api_key: api_key,
        secret_key: secret_key,
      },
      {
        headers: {
          "Content-Type": "application/json",
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
