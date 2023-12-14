import React, { useEffect } from "react";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOpRpDetails } from "../../../services/operator/query/transactions";
import { OnlinePaymentMethods } from "../../../components/common/constants";
import { formatDateNewTime } from "../../../utils/helpers";

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
        color={
          data === "Active" || data === "PAID" || data === "Completed"
            ? "#008000"
            : data === "Pending"
            ? "orange"
            : data === "Inactive" || data === "UNPAID" || data === "Cancelled"
            ? "red"
            : ""
        }
        fontWeight={500}
      >
        {data}
      </Text>
    </Flex>
  );
};

const ViewReservedParking = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { mutate, data, isLoading } = useGetOpRpDetails();

  useEffect(() => {
    mutate({ id: id });
  }, []);

  return (
    <Box minH="75vh">
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
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
          <Text fontWeight={500} lineHeight="100%">
            Back
          </Text>
        </Flex>

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Skeleton isLoaded={!isLoading} borderRadius="12px">
            {" "}
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
              <Layout label="Reservation ID" data={data?.reservationId} />
              <Layout label="Location" data={data?.zone?.location?.name} />
              <Layout label="Zone" data={data?.zone?.name} />
              <Layout
                label="Reservable Space"
                data={data?.zone?.reservableSpace}
              />
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
                label="Payment Method"
                data={OnlinePaymentMethods?.find(
                  (dat, i) => i === data?.paymentMethod
                )}
              />
              <Layout
                label="Payment Status"
                data={
                  data?.paymentStatus === 0
                    ? "UNPAID"
                    : data?.paymentStatus === 1
                    ? "PAID"
                    : "N/A"
                }
              />
              <Layout label="Date" data={formatDateNewTime(data?.createdAt)} />
              <Layout
                label="Status"
                data={
                  data?.status === 0
                    ? "Pending"
                    : data?.status === 1
                    ? "Completed"
                    : data?.status === 2 && "Cancelled"
                }
              />
            </Flex>
          </Skeleton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ViewReservedParking;
