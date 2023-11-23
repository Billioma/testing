import React, { useEffect } from "react";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLog } from "../../../../services/operator/query/logs";
import { BillingTypes } from "../../../../components/common/constants";
import { formatDate } from "../../../../utils/helpers";

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

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate, data, isLoading } = useGetLog();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  return (
    <Box minH="75vh">
      <Flex align="flex-start">
        <Box w="full">
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
        </Box>

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Skeleton isLoaded={!isLoading} borderRadius="12px">
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
              <Layout label="Vehicle" data={data?.vehicle?.licensePlate} />
              <Layout
                label="Amount"
                data={`
                ₦ ${
                  data?.amount?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"
                }`}
              />
              <Layout
                label="Extended"
                data={
                  data?.extended === 0
                    ? "False"
                    : data?.extended === 1
                    ? "True"
                    : ""
                }
              />
              <Layout
                label="isReserved"
                data={
                  data?.isReserved === 0
                    ? "False"
                    : data?.isReserved === 1
                    ? "True"
                    : ""
                }
              />
              <Layout
                label="Delivered"
                data={
                  data?.delivered === 0
                    ? "False"
                    : data?.delivered === 1
                    ? "True"
                    : ""
                }
              />
              <Layout
                label="Final Amount"
                data={`
                ₦ ${
                  data?.finalAmount?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"
                }`}
              />
              <Layout
                label="Billing Type"
                data={BillingTypes?.find((item, i) => i === data?.billingType)
                  ?.replace("_", " ")
                  ?.replace("_", " ")}
              />
              <Layout label="Comment" data={data?.comment || "N/A"} />
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
              <Layout label="Date" data={formatDate(data?.createdAt)} />
            </Flex>
          </Skeleton>
        </Flex>
        <Box w="full"></Box>
      </Flex>
    </Box>
  );
};

export default Details;
