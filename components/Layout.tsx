import React from "react";
import Head from "next/head";
import Navbar from "./navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>Movie app</title>
        <meta
          name="description"
          content="Statistic using Next.js and GraphQL"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      <main className="relative flex justify-center  bg-primary min-h-screen">
        {children}

        <img src="Vectors.png" className=" absolute bottom-0 w-full h-20" />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
