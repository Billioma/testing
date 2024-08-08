import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import LocationDistro from "./LocationDistro";
import Generated from "./Generated";
import TimesChart from "./TimesChart";
import Revenue from "./Revenue";
import Ratings from "./Ratings";

const Operators = () => {
  return (
    <Box>
      <Flex
        my="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "60%" }}>
          <Revenue />
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <LocationDistro />
        </Box>
      </Flex>

      <Flex
        my="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "40%" }}>
          <Ratings />
        </Box>
        <Box w={{ base: "100%", md: "60%" }}>
          <TimesChart />
        </Box>
      </Flex>

      <Box mt="24px">
        <Generated />
      </Box>
    </Box>
  );
};

export default Operators;
