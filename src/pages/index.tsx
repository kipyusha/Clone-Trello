import Head from "next/head";
import React from "react";
import App from "./App";


export default function Home() {
  return (
    <>
      <Head>
        <title>Clone Trello</title>
      </Head>
      <main>
        <App />
      </main>
    </>
  );
}
