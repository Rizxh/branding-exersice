import "@fontsource-variable/plus-jakarta-sans"

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/components/theme";
import Layout from "@/components/Layout/Layout";

export default function App({Component, pageProps}) {
  console.log("PageProps data:", pageProps);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};
