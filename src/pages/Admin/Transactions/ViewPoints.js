import React, { useEffect } from "react";
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { formatNewDate } from "../../../utils/helpers";
import { useGetPointsDetails } from "../../../services/admin/query/transactions";
import { Status } from "../../../components/common/constants";

export const Layout = ({ label, data }) => {
  return (
    <Flex justifyContent={"space-between"} align="center" color="#646668">
      <Text fontSize="14px" lineHeight="100%">
        {label}
      </Text>
      <Text fontWeight={500} lineHeight="100%">
        {data}
      </Text>
    </Flex>
  );
};
export default function ViewPoints() {
  const { id } = useParams();
  const { mutate, data, isLoading } = useGetPointsDetails();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "30px" }}
      >
        <Box w="fit-content">
          <GoBackTab />
        </Box>
        {isLoading ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
              <Flex
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
                flexDir="column"
                border="1px solid #E4E6E8"
                gap="24px"
              >
                <Layout label="Ticket ID" data={data?.id} />
                <Layout label="Customer" data={data?.customer?.email} />
                <Layout label="Amount" data={data?.amount?.toLocaleString()} />

                <Layout
                  label="Status"
                  data={data?.status && Object?.values(Status[data?.status])[1]}
                />
                <Layout label="Date" data={formatNewDate(data?.createdAt)} />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
