import React, { useEffect } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetClientServiceLog } from "../../../services/client/query/logs";
import { LogStatus } from "../../../components/common/constants";
import { formatNewDate } from "../../../utils/helpers";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

export const Layout = ({ label, data }) => {
  return (
    <Flex
      mb="24px"
      color="#646668"
      justifyContent="space-between"
      w="full"
      align="center"
    >
      <Text lineHeight="100%" fontSize="14px">
        {label}
      </Text>
      <Text
        lineHeight="100%"
        color={data === "Active" ? "#008000" : data === "Inactive" ? "red" : ""}
        fontWeight={500}
      >
        {data}
      </Text>
    </Flex>
  );
};

const ValetDetails = () => {
  const { id } = useParams();
  const { mutate, data, isLoading } = useGetClientServiceLog();

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
                bg="#fff"
                borderRadius="12px"
                border="1px solid #D4D6D8"
                py="40px"
                px="32px"
                justifyContent="center"
                align="center"
                w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
                flexDir="column"
              >
                <Layout label="Ticket Number" data={data?.ticketNumber} />
                <Layout
                  label="Amount"
                  data={`₦ ${data?.amount?.toLocaleString()}`}
                />
                <Layout label="Location" data={data?.location?.name} />
                <Layout label="Zone" data={data?.zone?.name} />
                <Layout label="Attendant" data={data?.attendant?.name} />
                <Layout label="Service" data={data?.service?.name} />
                <Layout
                  label="Payment Status"
                  data={
                    data?.paymentStatus === 0
                      ? "UNPAID"
                      : data?.paymentStatus === 1
                      ? "PAID"
                      : ""
                  }
                />
                <Layout
                  label="Status"
                  data={data && Object?.values(LogStatus[data?.status])[1]}
                />
                <Layout label="Date" data={formatNewDate(data?.createdAt)} />
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ValetDetails;
