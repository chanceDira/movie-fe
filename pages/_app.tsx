import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { getApolloClient } from "../lib/apollo-client";
import Layout from "../components/Layout";
import React from "react";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  const client = getApolloClient();
  return (
    <Provider store={store}>
      {" "}
      <Layout>
        <Component {...pageProps} />
      </Layout>{" "}
    </Provider>
  );
}

export default MyApp;
