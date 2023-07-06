import React from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex } from "@chakra-ui/layout";

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
  return (
    <Box pos="relative" h="100vh">
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
      <Flex justifyContent="center" align="center" w="full">
        <Box w={{ base: "full", lg: "1295px" }} minH="100vh" px="20px">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
