import React from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import Revenue from "./Revenue";
import SentVsUnsent from "./SentVsUnsent";
import Paid from "./Paid";
import PaidUnpaid from "./PaidUnpaid";
import Generated from "./Generated";

const Invoices = ({ data, isLoading }) => {
  return (
    <Box>
      <Flex align="center" gap="24px" flexDir={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <Revenue revenue={data} dataa={data?.data?.dueInvoices} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <SentVsUnsent dataa={data?.data?.sentVsUnsent} />
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
            <PaidUnpaid dataa={data?.data?.paidVsUnpaid} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <Paid revenue={data} dataa={data?.data?.paidInvoices} />
          </Skeleton>
        </Box>
      </Flex>

      <Box>
        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <Generated dataa={data?.data?.topClientInvoices} />
        </Skeleton>
      </Box>
    </Box>
  );
};

export default Invoices;
