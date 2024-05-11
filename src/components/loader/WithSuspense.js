import React, { Suspense } from "react";
import { Flex, CircularProgress } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100vh" }}
    >
      <CircularProgress isIndeterminate color="#325D41" />
    </Flex>
  );
};
const WithSuspense = (Component) => (props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

export default WithSuspense;
