import type { NextApiRequest, NextApiResponse } from "next";

import { OAuthService } from "@/services/authorize";

export default function authorizeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const url = OAuthService.generateURL();

  //   return res.status(200).json({ url: url });

  return res.redirect(url);
}
