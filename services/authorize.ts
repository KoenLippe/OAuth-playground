import { v4 as uuid } from "uuid";

const AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const TOKEN_URL = "https://github.com/login/oauth/access_token";
const API_BASE_URL = "https://api.github.com/";
const SCOPE = [
  "repo",
  "user",
  "project",
  //   "gist",
  //   "notifications",
  //   "codespace",
  //   "workflow",
];

export class OAuthService {
  public static generateURL = () => {
    const { clientId, redirectUri } = getEnv();

    const state = uuid();

    const url = new URL(AUTHORIZE_URL);
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("redirect_uri", redirectUri);
    url.searchParams.append("scope", SCOPE.join(" "));
    url.searchParams.append("state", state);

    return url.toString();
  };

  public static retrieveAccessToken = async (code: string) => {
    const { clientId, clientSecret, redirectUri } = getEnv();

    const url = new URL(TOKEN_URL);
    url.searchParams.append("client_id", clientId);
    url.searchParams.append("client_secret", clientSecret);
    url.searchParams.append("code", code);
    url.searchParams.append(
      "redirect_uri",
      "https://vrfg2o-ip-82-72-215-244.tunnelmole.com",
    );

    console.log(`shoot ${url.toString()}`);
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw Error("ERROR");

    return response.json();

    const a = {
      access_token: "XXXXXX",
      token_type: "bearer",
      scope: "project,repo,user",
    };

    // Accept: application/json
    // {
    // "access_token":"XXXXXX",
    // "scope":"repo,gist",
    // "token_type":"bearer"
    // }
  };
}

const getEnv = (): {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
} => {
  const clientId = process.env.GITHUB_CLIENT_ID ?? "";
  const clientSecret = process.env.CLIENT_SECRET ?? "";
  const redirectUri = process.env.REDIRECT_URI ?? "";

  return { clientId, clientSecret, redirectUri };
};
