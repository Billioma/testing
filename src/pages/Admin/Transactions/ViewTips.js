import React, { useEffect } from "react";
import { Box, Flex, Text, Spinner } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useParams } from "react-router-dom";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetAdminTipsDetails } from "../../../services/admin/query/transactions";

export default function ViewTips() {
  const { id } = useParams();

  const { mutate: detailsMutate, data, isLoading } = useGetAdminTipsDetails();

  useEffect(() => {
    detailsMutate({ id: id });
  }, []);

  return (
    <Box minH="75vh">
      <Flex
        align="flex-start"
        flexDir={{ md: "row", base: "column" }}
        gap={{ base: "", md: "40px" }}
      >
        <GoBackTab />
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
                borderRadius="8px"
                py="32px"
                px="24px"
                justifyContent="center"
                w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
                flexDir="column"
                border="1px solid #E4E6E8"
              >
                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Ticket Number
                  </Text>
                  <CustomInput
                    auth
                    value={data?.serviceLog?.ticketNumber}
                    mb
                    isDisabled
                  />
                </Box>

                <Box w="full" mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Amount
                  </Text>
                  <CustomInput
                    auth
                    value={"₦" + data?.amount?.toLocaleString()}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Customer
                  </Text>
                  <CustomInput
                    auth
                    value={`${data?.serviceLog?.customer?.profile?.firstName} ${data?.serviceLog?.customer?.profile?.lastName}`}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Attendant
                  </Text>
                  <CustomInput
                    auth
                    value={data?.serviceLog?.attendant?.name}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Payment Method
                  </Text>
                  <CustomInput
                    auth
                    value={data?.paymentMethod === 1 ? "Wallet" : "Card"}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>

                <Box mb={4}>
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Zone
                  </Text>
                  <CustomInput
                    auth
                    value={data?.serviceLog?.zone?.name}
                    mb
                    type="text"
                    isDisabled
                  />
                </Box>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
}
