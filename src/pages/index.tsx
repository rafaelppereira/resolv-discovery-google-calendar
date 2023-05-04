import Head from "next/head";
import { CalendarStep } from "@/components/CalendarStep";
import { SignInButton } from "@/components/SignInButton";
import { useSession } from "next-auth/react";
import { Profile } from "@/components/Profile";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "./api/auth/[...nextauth]";

export default function Home() {
  const session = useSession();
  const isSignedIn = session.status === "authenticated";

  return (
    <>
      <Head>
        <title>Discovery Google Calendar | Resolv.AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div
        style={{
          width: "800px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isSignedIn ? (
          <>
            <Profile
              name={session.data.user?.name}
              email={session.data.user?.email}
              avatar={session.data.user?.image}
            />
            <CalendarStep />
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
