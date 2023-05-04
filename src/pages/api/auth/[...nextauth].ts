import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext["req"],
  res: NextApiResponse | NextPageContext["res"]
): NextAuthOptions {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            scope:
              "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
          },
        },
      }),
    ],

    callbacks: {
      async signIn({ account }) {
        if (
          !account?.scope?.includes("https://www.googleapis.com/auth/calendar")
        ) {
          return "/error";
        }

        console.log(account.access_token);
        console.log("=========");
        console.log(account.refresh_token);
        console.log("=========");
        console.log(account.expires_at);

        return true;
      },

      async session({ session, user }) {
        return {
          ...session,
          ...user,
        };
      },
    },
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res));
}
