import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, useMediaQuery } from "@chakra-ui/react";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";

export const AuthLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  const [show, setShow] = useState(true);

  return (
    <Box color="#000" fontFamily="Sailec" h="100vh">
      <Box overflowX="hidden">
        {!isMobile && <SideBar show={show} setShow={setShow} />}
        <Box h="2.3rem" w="full" bg="#fff" zIndex={55} pos="fixed" top="0">
          <Box pt="32px" px={!isMobile ? (show ? "310px" : "88px") : "20px"}>
            <Header showSidebar={show} />
          </Box>
        </Box>
        <Box overflow="auto" className="no_scroller">
          <Box
            w="100%"
            pt={isMobile ? "150px" : "125px"}
            color="#828282"
            maxHeight="92vh"
            pl={!isMobile ? (show ? "310px" : "88px") : "20px"}
            pr={!isMobile ? "32px" : "20px"}
            pb={10}
          >
            {children}
          </Box>
        </Box>
        <Box h="10vh" w="full"></Box>
        <Box mt="20px" px={!isMobile ? (show ? "310px" : "88px") : "20px"}>
          <Footer showSidebar={show} />
        </Box>
      </Box>
    </Box>
  );
};

export const NonAuthLayout = ({ children }) => {
  const today = new Date();
  return (
    <>
      <Flex pt="51px" pl="39px" align="center" gap="8px">
        <Image src="/logo.svg" w="38px" h="38px" objectFit="contain" />
        <Box>
          <Text fontWeight={500}>Managr</Text>
          <Text fontSize="11px">Powered by EZPark</Text>
        </Box>
      </Flex>
      <Flex
        flexDir="column"
        fontFamily="Sailec"
        justifyContent="center"
        align="center"
        minH="80vh"
      >
        <Flex
          flexDir="column"
          justifyContent="center"
          align="center"
          minH="80vh"
          w={{ base: "full", lg: "595px" }}
          px="20px"
          pb="10px"
        >
          {children}
        </Flex>
        <Flex
          mt="auto"
          mb="20px"
          fontSize="14px"
          fontWeight={500}
          flexDir="column"
          justifyContent="center"
          align="center"
        >
          Copyright @EZPark {today.getFullYear()} | Privacy Policy
        </Flex>
      </Flex>
    </>
  );
};
