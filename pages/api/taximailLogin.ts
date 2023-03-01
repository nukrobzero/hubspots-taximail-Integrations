import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function TaximailLogin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { apiKey, secretKey } = req.body;
    const response = await axios.post(
      "https://api.taximail.com/v2/user/login",
      {
        api_key: apiKey,
        secret_key: secretKey,
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
