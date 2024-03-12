import { UserContextProvider } from "@/context/userContext";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;

  return (
    <ChakraProvider>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  )
}
