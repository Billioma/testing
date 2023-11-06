import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, useMediaQuery } from "@chakra-ui/react";
import Header from "./Header";
import SideBar from "./SideBar";

export const AuthLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");

  return (
    <Box color="#000" fontFamily="Sailec" h="100vh">
      <Box overflowX="hidden">
        {!isMobile && <SideBar />}
        <Box h="2.3rem" w="full">
          <Box pt="32px" px={!isMobile ? "310px" : "20px"}>
            <Header />
          </Box>
        </Box>
        <Box overflow="auto" className="no_scroller">
          <Box
            w="100%"
            pt={isMobile ? "130px" : "105px"}
            color="#828282"
            maxHeight="92vh"
            pl={!isMobile ? "310px" : "20px"}
            pr={!isMobile ? "32px" : "20px"}
            pb={10}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const NonAuthLayout = ({ children }) => {
  return (
    <Flex flexDir="column" justifyContent="center" align="center" minH="100vh">
      <Flex
        flexDir="column"
        justifyContent="center"
        align="center"
        minH="90vh"
        w={{ base: "full", lg: "1295px" }}
        px="20px"
        pb="10px"
      >
        {children}
      </Flex>
      <Flex
        mt="auto"
        mb="20px"
        flexDir="column"
        justifyContent="center"
        align="center"
      >
        <Text fontSize="12px" lineHeight="100%" mb="8px">
          Powered by
        </Text>
        <Image src="/assets/ezlogo.png" />
      </Flex>
    </Flex>
  );
};
