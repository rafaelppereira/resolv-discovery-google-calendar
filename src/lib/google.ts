import { google } from "googleapis";
import {} from "next-auth/react";

export async function getGoogleOAuthToken() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  auth.setCredentials({
    access_token:
      "ya29.a0AWY7Ckm9ESQPpN7UE1wNGqfVHWk5pmOroQfYZ8BgEDgkp0Cy67wnKVz_wZ_RYrmezA8VSlPFXL_2ZEvtSMMBC59p1xl-j6fgFeZe_R4Ta1i-m3swqGt7p5P1W0oQBcARh9mtpHZ6BPxxUQzJl0X8jqTKKYxcaCgYKAYkSARISFQG1tDrpplciP2L2Fn2ncdpjy3pu_A0163",
    refresh_token:
      "1//0fLo1GZB6mC--CgYIARAAGA8SNwF-L9IrTeuyWAHRWaeWjWNBSvvZbWgVxehwAX7ihqaQ23JgERyXIJoJDp6O6fI3w5BBWMysKQY",
    expiry_date: 1683208338,
  });

  const { credentials } = await auth.refreshAccessToken();
  const { access_token, expiry_date, refresh_token } = credentials;

  return auth;
}
