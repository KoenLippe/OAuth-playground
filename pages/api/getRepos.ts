import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE_URL = "https://api.github.com";

export default async function authorizeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const a = {
    access_token: "XXXXXX",
    token_type: "bearer",
    scope: "project,repo,user",
  };

  const url = new URL(API_BASE_URL);

  const response = await fetch(`${API_BASE_URL}/users/KoenLippe/repos`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + a.access_token,
    },
  });

  return res.json(await response.json());
}
