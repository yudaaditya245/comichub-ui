"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "next/router";
import NProgress from "nprogress";
import Head from "next/head";

export default function Provider({ children }) {
  const queryClient = new QueryClient();

  Router.onRouteChangeStart = url => {
    NProgress.start();
  };

  Router.onRouteChangeComplete = () => NProgress.done();

  Router.onRouteChangeError = () => NProgress.done();

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
      </Head>
      {children}
    </QueryClientProvider>
  );
}
