import "../lib/dayjs";

import { SessionProvider } from "next-auth/react";

import { globalStyles } from "@/styles/global";
import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

globalStyles();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main className={poppins.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
    </main>
  );
}
