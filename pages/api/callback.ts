import { OAuthService } from "@/services/authorize";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function callbackHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const code = req.query.code as string;
  const state = req.query.state as string;

  try {
    const tokenResponse = await OAuthService.retrieveAccessToken(code);
    if (tokenResponse.access_token) {
      res.redirect("/api/getUser");
    }

    return res.json(tokenResponse);
  } catch (error) {
    return res.status(500).json(error);
  }
}
