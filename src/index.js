import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { customTheme } from "./styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/custom.css";
import "./styles/satoshi.css";
import Fonts from "./styles/Fonts";

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

root.render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Fonts />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
