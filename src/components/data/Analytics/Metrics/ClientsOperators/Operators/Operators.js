import React from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import LocationDistro from "./LocationDistro";
import Generated from "./Generated";
import TimesChart from "./TimesChart";
import Revenue from "./Revenue";
import Ratings from "./Ratings";

const Operators = ({ operators, isOperator }) => {
  return (
    <Box>
      <Flex
        my="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isOperator} borderRadius="8px">
            <Revenue dataa={operators?.data?.totalRevenueGenerated} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <Skeleton isLoaded={!isOperator} borderRadius="8px">
            <LocationDistro
              dataa={operators?.data?.operatorLocationDistribution}
            />
          </Skeleton>
        </Box>
      </Flex>

      <Flex
        my="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "40%" }}>
          <Skeleton isLoaded={!isOperator} borderRadius="8px">
            <Ratings dataa={operators?.data?.customerRatings} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isOperator} borderRadius="8px">
            <TimesChart dataa={operators?.data?.averagePeakTimes} />
          </Skeleton>
        </Box>
      </Flex>

      <Box mt="24px">
        <Skeleton isLoaded={!isOperator} borderRadius="8px">
          <Generated
            dataa={operators?.data?.revenueGeneratedFromEachOperator}
          />
        </Skeleton>
      </Box>
    </Box>
  );
};

export default Operators;
