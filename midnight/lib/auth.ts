import Cookies from "cookies";
import crypto from "node:crypto";

export const getAuthorizeURL = (req: any, res: any, query: any) => {
  const codeVerifier = crypto.randomBytes(32).toString("base64url");
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");
  const cookies = new Cookies(req, res);
  const oneHrInMs = 60 * 60 * 1000;
  cookies.set("assemble_code_verifier", codeVerifier, {
    overwrite: true,
    httpOnly: true,
    expires: new Date(Date.now() + oneHrInMs),
  });

  if (query.on_login) {
    cookies.set("assemble_login_redirect", query.on_login, {
      overwrite: true,
    });
  }

  const authorizeQuery = new URLSearchParams({
    app_id: "com.assemble.midnight",
    code_challenge: codeChallenge,
    redirect_uri: "https://midnight.hackclub.dev/auth/callback",
  });

  return `https://id.assemble.hackclub.com/oauth/authorize?${authorizeQuery.toString()}`;
};
