import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";
import Header from "./AuthLayout/Header";
import SideBar from "./AuthLayout/SideBar";

export const AuthLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  const [show, setShow] = useState(true);

  return (
    <Box color="#000" fontFamily="Sailec" h="100vh">
      <Box overflowX="hidden">
        {!isMobile && <SideBar show={show} setShow={setShow} />}
        <Box mt="32px" px={!isMobile ? (show ? "310px" : "88px") : "20px"}>
          <Header showSidebar={show} />
        </Box>
        <Box overflow="auto" className="no_scroller">
          <Box
            w="100%"
            pt={isMobile ? "150px" : "110px"}
            color="#828282"
            maxHeight="92vh"
            pl={!isMobile ? (show ? "310px" : "88px") : "20px"}
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
        <Text fontSize="14px" lineHeight="100%" mb="8px">
          Powered by
        </Text>
        <Image src="/assets/ezlogo.png" />
      </Flex>
    </Flex>
  );
};
