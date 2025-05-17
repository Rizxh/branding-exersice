import React, { Children } from "react";
import Sidebar from "../Sidebar";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

export default function Layout({children}) {
  return (
    <>
      <Head>
        <title>CMS Branding</title>
        <link rel="icon" href="/images/logo/favicon.png" type="image/x-icon"/>
      </Head>
      <Sidebar>  
        <main>
          {children}
        </main>
      </Sidebar>
    </>
  );
}
