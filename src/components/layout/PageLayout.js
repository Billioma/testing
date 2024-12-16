import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import OperatorHeader from "./OperatorHeader";
import { Box, Flex } from "@chakra-ui/react";

const PageLayout = ({ children }) => {
  const location = useLocation();

  return (
    <Flex
      fontFamily="Recoleta"
      bg="#fff"
      overflow="hidden"
      w="full"
      flexDir="column"
      minH="100vh"
    >
      {location.pathname === "/operators" ? <OperatorHeader /> : <Header />}
      <Flex justifyContent="center" align="center">
        <Box w={{ base: "full", lg: "1390px" }} px="20px">
          {children}

          {location.pathname !== "/redirect=" ? <Footer /> : ""}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageLayout;
