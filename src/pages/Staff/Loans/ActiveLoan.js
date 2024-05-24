import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetLoan } from "../../../services/staff/query/loan";
import { formatDate } from "../../../utils/helpers";
import DonutChart from "../../../components/data/Staff/Loan/DonutChart";
import GoBackTab from "../../../components/data/Admin/GoBackTab";

const LoanDetails = () => {
  const { id } = useParams();
  const {
    data: loanData,
    isLoading,
    refetch,
  } = useGetLoan(id, {
    refetchOnWindowFocus: true,
  });
  const data = JSON.parse(sessionStorage.getItem("activeLoan"));

  const dataToMap = !data ? loanData : data;

  useEffect(() => {
    refetch();
  }, []);

  const pending = dataToMap?.repaymentPlans
    ?.filter((item) => item?.status === "PENDING")
    ?.reduce((acc, item) => acc + item?.amount, 0);

  return (
    <Box>
      <GoBackTab />{" "}
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Text
            fontSize={{ base: "35px", md: "48px" }}
            fontWeight={500}
            color="#090c02"
            mb="10px"
          >
            Active Loan
          </Text>
          <Flex
            flexDir="column"
            justifyContent="center"
            h="224px"
            borderRadius="12px"
            bg="#075666"
            px="60px"
            pos="relative"
          >
            <Image
              src="/assets/top-left.svg"
              w="240px"
              h="240px"
              pos="absolute"
              top="-10"
              left="-5"
            />
            <Flex align="center" justifyContent="space-between" w="full">
              <Flex align="center" gap="16px" fontWeight={500}>
                <Flex
                  justifyContent="center"
                  align="center"
                  bg="rgba(29, 211, 176, 0.4)"
                  rounded="full"
                  py="4px"
                  color="#fff"
                  px="10px"
                >
                  Active
                </Flex>
                <Flex
                  justifyContent="center"
                  align="center"
                  color="#075666"
                  bg="#fff"
                  rounded="full"
                  py="4px"
                  px="10px"
                >
                  {dataToMap?.purpose}
                </Flex>
              </Flex>

              <Flex align="center" w="50%" gap="140px">
                <Box color="#fff" fontWeight={700}>
                  <Box>
                    <Text opacity={0.4} fontSize="12px">
                      LEFT TO BE REPAID
                    </Text>
                    <Text mt="5px" fontSize="22px">
                      ₦ {pending?.toLocaleString()}
                    </Text>
                  </Box>

                  <Box mt="10px">
                    <Text opacity={0.4} fontSize="12px">
                      DUE DATE
                    </Text>
                    <Text mt="5px" fontSize="22px">
                      {formatDate(dataToMap?.dueDate)}
                    </Text>
                  </Box>
                </Box>

                <Box color="#fff" fontWeight={700}>
                  <Box>
                    <Text opacity={0.4} fontSize="12px">
                      AMOUNT LOANED
                    </Text>
                    <Text mt="5px" fontSize="22px">
                      ₦ {dataToMap?.amountLoaned?.toLocaleString()}
                    </Text>
                  </Box>

                  <Box mt="10px">
                    <Text opacity={0.4} fontSize="12px">
                      ISSUED DATE
                    </Text>
                    <Text mt="5px" fontSize="22px">
                      {formatDate(dataToMap?.createdAt)}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Flex>

            <Image
              src="/assets/bottom-right.svg"
              w="220px"
              h="220px"
              opacity={0.8}
              pos="absolute"
              bottom="-40px"
              right="0"
            />
          </Flex>
          <Box
            mt="24px"
            border="1px solid #BAE0D9"
            borderRadius="12px"
            display={dataToMap?.additionalComments ? "block" : "none"}
            py="16px"
            px="30px"
          >
            {dataToMap?.additionalComments}
          </Box>

          <Flex
            mt="24px"
            flexDir={{ base: "column", md: "row" }}
            align={{ base: "flex-start", md: "center" }}
            gap="24px"
          >
            <Box
              w={{ base: "100%", md: "60%" }}
              border="1px solid #08637533"
              h="294px"
              borderRadius="8px"
              py="16px"
              px="20px"
            >
              <Text fontWeight={500} fontSize="18px">
                Repayment Plan
              </Text>

              <TableContainer mt="14px">
                <Table>
                  <Thead>
                    <Tr>
                      {["PERIOD", "DATE", "AMOUNT", "STATUS"].map((item, i) => (
                        <Th
                          key={i}
                          _last={{ textAlign: "center" }}
                          color="#086375"
                          fontSize="13px"
                          fontFamily="Satoshi"
                          fontWeight={700}
                        >
                          {item}
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dataToMap?.repaymentPlans?.map((item, i) => (
                      <Tr fontSize="14px" key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{item?.dueDate}</Td>
                        <Td> ₦ {item?.amount?.toLocaleString()}</Td>
                        <Td>
                          <Flex justifyContent="center" align="center" w="100%">
                            <Flex
                              justifyContent="center"
                              align="center"
                              fontWeight={500}
                              border={
                                item?.status === "PENDING"
                                  ? "1px solid #F3CE0E33"
                                  : "1px solid #00765F33"
                              }
                              bg={
                                item?.status === "PENDING"
                                  ? "#F8E16C66"
                                  : "#1DD3B01A"
                              }
                              color={
                                item?.status === "PENDING"
                                  ? "#F3CE0E"
                                  : "#00765F"
                              }
                              borderRadius="100px"
                              w="fit-content"
                              py="4px"
                              textTransform="capitalize"
                              px="10px"
                            >
                              {item?.status?.toLowerCase()}
                            </Flex>
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            <Box
              w={{ base: "100%", md: "40%" }}
              border="1px solid #08637533"
              h="294px"
              borderRadius="8px"
              py="16px"
              px="20px"
            >
              <DonutChart data={dataToMap} />
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default LoanDetails;
