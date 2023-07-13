import React from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useLocation } from "react-router-dom";

export const AuthLayout = ({ children }) => {
  return (
    <Box>
      <Flex justifyContent="center" align="center">
        <Box w={{ base: "full", lg: "1295px" }} minH="100vh" px="20px">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export const NonAuthLayout = ({ children }) => {
  const location = useLocation();
  return (
    <Flex flexDir="column" pos="relative" h="100vh">
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
        h={location.pathname === "/signup" ? "100vh" : "90vh"}
        flexDir="column"
        justifyContent="center"
        align="center"
        w="full"
      >
        <Box w={{ base: "full", lg: "1295px" }} minH="100vh" px="20px">
          {children}
        </Box>
        <Flex mt="auto" flexDir="column" justifyContent="center" align="center">
          <Text fontSize="12px" lineHeight="100%" mb="8px">
            Powered by
          </Text>
          <Image
            mb={location.pathname === "/signup" ? "20px" : "0"}
            src="/assets/ezlogo.png"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
