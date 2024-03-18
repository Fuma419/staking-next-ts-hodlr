import "../styles/globals.css";
import { createGlobalStyle } from 'styled-components';
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Component {...pageProps} />
    </MeshProvider>
  );
}

export default MyApp;
