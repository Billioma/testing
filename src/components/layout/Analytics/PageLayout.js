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
  return (
    <Box color="#000" fontFamily="Sailec" bg="#fff">
      <Flex minH="100vh">
        <Box
          w={{ base: "100%", md: "50%" }}
          p={{ base: "20px", md: "28px" }}
          pr={{ base: "20px", md: "0" }}
        >
          <Flex flexDir="column" w="100%">
            <Text
              fontSize={{ base: "20px", md: "28px" }}
              lineHeight="120%"
              fontWeight={900}
              fontFamily="Cooper"
            >
              <span style={{ color: "red" }}>Parkin</span>
              Space
            </Text>
            <Text fontSize="15px" color="#444648">
              Analytics
            </Text>
            {children}
          </Flex>
        </Box>

        <Box
          display={{ base: "none", lg: "block" }}
          top="2.1rem"
          h="36rem"
          pos="fixed"
          right="0"
          pr="24px"
          w="40%"
        >
          <Image
            src="/assets/lappy.svg"
            w="full"
            objectFit="contain"
            h="90vh"
          />
        </Box>
      </Flex>
    </Box>
  );
};
