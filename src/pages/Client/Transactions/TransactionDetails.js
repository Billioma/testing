import React, { useEffect } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetClientEventParkingDetails } from "../../../services/client/query/events";
import { OnlinePaymentMethods } from "../../../components/common/constants";
import { formatNewDate } from "../../../utils/helpers";

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
        color={
          data === "PAID" || data === "Completed"
            ? "#008000"
            : data === "UNPAID" || data === "Failed"
            ? "red"
            : data === "Pending"
            ? "#F9A11E"
            : ""
        }
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
  const { id } = useParams();

  const { mutate, data, isLoading } = useGetClientEventParkingDetails();

  useEffect(() => {
    mutate({ id: id });
  }, []);

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

                <Layout label="Event" data={data?.event?.name} />
                <Layout
                  label="Amount"
                  data={`₦ ${data?.amount?.toLocaleString()}`}
                />
                <Layout label="Location" data={data?.zone?.location?.name} />
                <Layout label="Zone" data={data?.zone?.name} />
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
                  label="Transaction Type"
                  data={OnlinePaymentMethods?.find(
                    (dat, i) => i === data?.transaction?.paymentMethod
                  )}
                />
                <Layout
                  label="Status"
                  data={
                    data?.status === 0
                      ? "Pending"
                      : data?.status === 1
                      ? "Completed"
                      : data?.status === 2 && "Pending"
                  }
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

export default TransactionDetails;
