import { google } from "googleapis";
import {} from "next-auth/react";

export async function getGoogleOAuthToken() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  auth.setCredentials({
    access_token:
      "ya29.a0AWY7CkkKmlMjzM_uJ9l4IC9qn2JaJCy0e_703wJ02HhPqB2vL5gnx2xve9ReGgSPQwVp5KCQXMCxrLV6SnKnFtkPOuw56HlDCatoExj_2pC3uDOE1a7zbxRAOvl-4Jp828mhlrcMzWvqwUQqQ-Cwr2c6kb9raCgYKAYkSARASFQG1tDrphPrgjodOOfT7coXEqjr4ng0163",
    refresh_token:
      "1//0hY582BpLiIoFCgYIARAAGBESNwF-L9Irp3vPRABEQAT7eoIJJCWoxBpt_GkOH7Col7-b8PTTm_w--jIH6JrRdO4e33AB2SlCSQY",
    expiry_date: 1683230332,
  });

  const { credentials } = await auth.refreshAccessToken();
  const { access_token, expiry_date, refresh_token } = credentials;

  auth.setCredentials({
    access_token,
    expiry_date,
    refresh_token,
  });

  return auth;
}
