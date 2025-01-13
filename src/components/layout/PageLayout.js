import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import OperatorHeader from "./OperatorHeader";
import { Box, Flex } from "@chakra-ui/react";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Flex
      fontFamily="Recoleta"
      bg="#fff"
      overflow="hidden"
      w="full"
      flexDir="column"
      minH="100vh"
    >
      {pathname === "/operators" ? <OperatorHeader /> : <Header />}
      <Flex justifyContent="center" align="center">
        <Box
          mt={{ base: "80px", lg: "90px" }}
          w={{ base: "full", lg: "1390px" }}
          px="20px"
        >
          {children}

          {pathname !== "/redirect=" ? <Footer /> : ""}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageLayout;
