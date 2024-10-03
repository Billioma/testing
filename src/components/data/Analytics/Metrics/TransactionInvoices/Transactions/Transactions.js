import React from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import Revenue from "./Revenue";
import Service from "./Service";
import Processed from "./Processed";
import Completed from "./Completed";

const Transactions = ({ data, isLoading }) => {
  return (
    <Box>
      <Flex
        my="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <Revenue revenue={data} dataa={data?.data?.totalRevenueGenerated} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <Service dataa={data?.data?.revenueByServiceType} />
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
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <Completed dataa={data?.data?.completedVsCancelled} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <Processed
              revenue={data}
              dataa={data?.data?.monthlyProcessedTransactions}
            />
          </Skeleton>
        </Box>
      </Flex>
    </Box>
  );
};

export default Transactions;
