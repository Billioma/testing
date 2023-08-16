import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  QueryClientProvider as TSQCP,
  QueryClient as TSQC,
} from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/custom.css";
import Fonts from "./styles/Fonts";
import { customTheme } from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: 600_000,
      retry: 0,
      refetchOnReconnect: true,
    },
  },
});

const tsQueryClient = new TSQC({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: 600_000,
      retry: 0,
      refetchOnReconnect: true,
    },
  },
});

root.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Fonts />
        <BrowserRouter>
          <TSQCP client={tsQueryClient}>
            <App />
          </TSQCP>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
