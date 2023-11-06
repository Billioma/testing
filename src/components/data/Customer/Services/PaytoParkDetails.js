import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useCreateTips,
  useGetPayToParkDetails,
  useGetTips,
} from "../../../../services/customer/query/services";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../utils/helpers";
import { Status } from "../../../common/constants";
import MakeTipModal from "../../../modals/MakeTipModal";
import useCustomToast from "../../../../utils/notifications";

export const Layout = ({ label, data }) => {
  return (
    <Flex
      mb="24px"
      align={{
        base: label === "Location" ? "flex-start" : "center",
        md: "center",
      }}
      lineHeight="100%"
      gap={{
        base: label === "Location" ? "10px" : "unset",
        md: "unset",
      }}
      fontSize="13px"
      flexDir={{ base: label === "Location" ? "column" : "row", md: "row" }}
      fontWeight={500}
      justifyContent="space-between"
      w="full"
    >
      <Box w="full">
        <Text color="#848688">{label}</Text>
      </Box>
      <Flex
        justifyContent={{
          base: label === "Location" ? "flex-start" : "flex-end",
          md: "flex-end",
        }}
        w={{
          base: label === "Selected Vehicle" ? "fit-content" : "full",
          md: "full",
        }}
      >
        <Text
          color={
            data === "Completed"
              ? "#075F14"
              : data === "Pending"
              ? "#F9A11E"
              : data === "Cancelled"
              ? "#E81313"
              : "#242628"
          }
        >
          {data}
        </Text>
      </Flex>
    </Flex>
  );
};

const Details = () => {
  const { id } = useParams();
  const {
    data,
    isLoading,
    refetch: refetchParking,
  } = useGetPayToParkDetails(id);
  const { data: tips, refetch } = useGetTips();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const currentTip = tips?.data?.find(
    (item) => item?.serviceLog?.id === data?.serviceLog?.id
  );

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Skeleton isLoaded={!isLoading} borderRadius="12px">
          <Flex
            bg="#fff"
            borderRadius="12px"
            py="40px"
            px="32px"
            justifyContent="center"
            w={{ base: "full", md: "30rem" }}
            flexDir="column"
          >
            <Flex
              flexDir="column"
              p="24px"
              align="center"
              pb="0"
              w="full"
              border="1px solid #d4d6d8"
              borderRadius="8px"
            >
              <Image
                src="/assets/park.png"
                w="40px"
                h="40px"
                objectFit="cover"
              />
              <Text
                mt="16px"
                mb="28px"
                fontSize="14px"
                fontWeight={500}
                lineHeight="100%"
                color="#242628"
              >
                Parking Details
              </Text>

              <Text
                fontSize="28px"
                color="#242628"
                fontWeight={700}
                lineHeight="100%"
              >
                ₦{" "}
                {data?.amount?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                }) || "0.00"}
              </Text>

              <Box mt="28px" w="full">
                <Layout label="Ticket Number" data={data?.ticketNumber} />
                <Layout label="Zone" data={data?.zone?.name} />
                <Layout label="Location" data={data?.zone?.location?.name} />
                <Layout label="Date" data={formatDate(data?.createdAt)} />
                <Layout
                  label="Selected Vehicle"
                  data={data?.vehicle?.licensePlate}
                />
                <Layout
                  label="Status"
                  data={data && Object.values(Status[data?.status])[1]}
                />

                {data?.status === 1 && (
                  <Layout
                    label="Tip"
                    data={
                      currentTip === undefined
                        ? "No tip added"
                        : `₦ ${
                            currentTip?.amount?.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            }) || "0.00"
                          }`
                    }
                  />
                )}
              </Box>
            </Flex>

            {data?.status === 1 && currentTip === undefined && (
              <Flex align="center" w="full" justifyContent="center" mt="28px">
                <Flex
                  align="center"
                  w="fit-content"
                  cursor="pointer"
                  onClick={onOpen}
                  justifyContent="center"
                  gap="8px"
                >
                  <Image src="/assets/tips.svg" />
                  <Text
                    fontSize="13px"
                    color="#075F14"
                    fontWeight={500}
                    lineHeight="100%"
                  >
                    Add a Tip
                  </Text>
                </Flex>
              </Flex>
            )}

            <Flex mt="28px" Falign="center" w="full" gap="20px">
              <Box w="full">
                <Button
                  w="full"
                  border="1px solid #ee7a38"
                  color="#ee7a38"
                  bg="transparent"
                  fontSize="13px"
                  borderRadius="4px"
                  py="17px"
                >
                  Report
                </Button>
              </Box>
              <Box w="full">
                <Button w="full" fontSize="13px" borderRadius="4px" py="17px">
                  Download Receipt
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Skeleton>
      </Flex>

      <MakeTipModal
        data={data}
        refetchParking={refetchParking}
        refetchTips={refetch}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default Details;
