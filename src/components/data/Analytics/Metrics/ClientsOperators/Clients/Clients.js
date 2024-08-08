import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Types from "./Types";
import Satisfaction from "./Satisfaction";
import Recently from "./Recently";
import LocationDistro from "./LocationDistro";
import Generated from "./Generated";

const Clients = () => {
  return (
    <Box>
      <Flex
        my="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "100%" }}>
          <Types />
        </Box>
        <Box w={{ base: "100%", md: "100%" }}>
          <Satisfaction />
        </Box>
      </Flex>

      <Flex align="center" gap="24px" flexDir={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "60%" }}>
          <Recently  />
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <LocationDistro />
        </Box>
      </Flex>

      <Box mt="24px">
        <Generated />
      </Box>
    </Box>
  );
};

export default Clients;
