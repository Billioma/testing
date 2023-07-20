import React from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";
import Header from "./AuthLayout/Header";
import SideBar from "./AuthLayout/SideBar";

export const AuthLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");

  return (
    <Box color="#000" fontFamily="Sailec" h="100vh" bg="#fff" p="15px">
      <Box
        py="24px"
        px={isMobile ? "5px" : "24px"}
        bg="#F4F6F8"
        overflowX="hidden"
        borderRadius="40px"
      >
        <Box mx={!isMobile ? "310px" : "20px"}>
          <Header />
        </Box>
        {!isMobile && <SideBar />}
        <Box overflow="auto" className="no_scroller">
          <Box
            w="100%"
            pt={isMobile ? "150px" : "95px"}
            color="#828282"
            maxHeight="89vh"
            pl={!isMobile ? "310px" : "20px"}
            pr={!isMobile ? "" : "20px"}
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
  const location = useLocation();
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  return (
    <Flex flexDir="column" pos="relative" minH="90vh" h="100%">
      <Image
        display={{ base: "none", md: "unset" }}
        pos="absolute"
        bottom="0"
        right="0"
        src="/assets/park-right.png"
      />
      <Image
        display={{ base: "none", md: "unset" }}
        w={{ base: "144px", md: "unset" }}
        pos="absolute"
        bottom="0"
        left="0"
        src="/assets/park-left.png"
      />
      <Flex
        minH={
          isMobile
            ? location.pathname === "/customer/auth/signup"
              ? "80vh"
              : "90vh"
            : "90vh"
        }
        flexDir="column"
        justifyContent="center"
        align="center"
        w="full"
      >
        <Box w={{ base: "full", lg: "1295px" }} minH="fit" px="20px">
          {children}
        </Box>
        <Flex
          mt="auto"
          flexDir="column"
          justifyContent="center"
          align="center"
          pb="25px"
        >
          <Text fontSize="12px" lineHeight="100%" mb="8px">
            Powered by
          </Text>
          <Image
            mb={location.pathname === "/customer/auth/signup" ? "0" : "0"}
            src="/assets/ezlogo.png"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
