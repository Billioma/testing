import React from "react";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";

const Layout = ({ title, value, isLoading }) => {
  return isLoading ? (
    <Skeleton
      isLoaded={!isLoading}
      borderRadius="8px"
      h="50px"
      w={{ base: "100%", md: "20%" }}
      mb="20px"
    />
  ) : (
    <Flex
      align="flex-start"
      mb="20px"
      justifyContent="space-between"
      w={{ base: "100%", md: "40%" }}
    >
      <Text
        textTransform="uppercase"
        color="#999999"
        fontSize="10px"
        fontWeight={700}
      >
        {title}
      </Text>
      <Text
        w="50%"
        textAlign="end"
        color="#090C02"
        fontSize="12px"
        fontWeight={500}
      >
        {value}
      </Text>
    </Flex>
  );
};

const ManagerReport = ({ data, isLoading }) => {
  return (
    <Box pt="20px" borderTop="1px solid #E2E5DC">
      <Layout
        isLoading={isLoading}
        title="cash"
        value={`₦${Number(data?.cashPayment)?.toLocaleString()}`}
      />
      <Layout
        isLoading={isLoading}
        title="transfer"
        value={`₦${Number(data?.bankTransfer)?.toLocaleString()}`}
      />
      <Layout
        isLoading={isLoading}
        title="pos"
        value={`₦${Number(data?.posPayment)?.toLocaleString()}`}
      />
      <Layout
        isLoading={isLoading}
        title="tips"
        value={`₦${Number(data?.tips)?.toLocaleString()}`}
      />
      <Layout
        isLoading={isLoading}
        title="total revenue"
        value={`₦${Number(data?.totalRevenueCollected)?.toLocaleString()}`}
      />
      <Layout
        isLoading={isLoading}
        title="cars parked"
        value={Number(data?.totalCarsParked)?.toLocaleString()}
      />
      <Layout isLoading={isLoading} title="remarks" value={data?.remarks} />
    </Box>
  );
};

export default ManagerReport;
