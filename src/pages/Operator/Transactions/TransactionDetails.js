import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const Layout = ({ label, data }) => {
  return (
    <Flex
      mb="24px"
      color="#646668"
      justifyContent="space-between"
      w="full"
      align="center"
    >
      <Text lineHeight="100%" fontSize="12px">
        {label}
      </Text>
      <Text
        lineHeight="100%"
        color={data === "Active" ? "#008000" : data === "Inactive" ? "red" : ""}
        fontSize="14px"
        fontWeight={500}
      >
        {data}
      </Text>
    </Flex>
  );
};

const TransactionDetails = () => {
  const navigate = useNavigate();
  return (
    <Box minH="75vh">
      <Flex align="flex-start">
        <Flex
          onClick={() => navigate(-1)}
          color="#242628"
          align="center"
          cursor="pointer"
          mb="23px"
          w="fit-content"
          pos="sticky"
          top="6rem"
          gap="8px"
        >
          <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
          <Text fontSize="14px" fontWeight={500} lineHeight="100%">
            Back
          </Text>
        </Flex>

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            border="1px solid #D4D6D8"
            py="40px"
            px="32px"
            justifyContent="center"
            align="center"
            w={{ base: "full", md: "30rem" }}
            flexDir="column"
          >
            <Layout label="Ticket Number" data="927484" />
            <Layout label="License" data="SJD83HD" />
            <Layout label="First Name" data="Bilal" />
            <Layout label="Last Name" data="Omari" />
            <Layout label="Amount" data="1000" />
            <Layout label="Location" data="Landmark Beach" />
            <Layout label="Zone" data="T01113" />
            <Layout label="Attendant" data="Bilal Omari" />
            <Layout label="Service" data="Self Parking" />
            <Layout label="Payment Status" data="Unpaid" />
            <Layout label="Status" data="Completed" />
            <Layout label="Date" data="2023-03-20" />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TransactionDetails;
