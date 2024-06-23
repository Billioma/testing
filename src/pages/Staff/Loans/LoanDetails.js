import React, { useEffect } from "react";
import {
  Box,
  Button,
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
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetLoan,
  useWithdrawLoan,
} from "../../../services/staff/query/loan";
import { LoanStatus } from "../../../components/common/constants";
import { formatDate } from "../../../utils/helpers";
import DonutChart from "../../../components/data/Staff/Loan/DonutChart";
import useCustomToast from "../../../utils/notifications";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetLoan(id, {
    refetchOnWindowFocus: true,
  });

  const pending = data?.repaymentPlans
    ?.filter((item) => item?.status === "PENDING")
    ?.reduce((acc, item) => acc + item?.amount, 0);

  useEffect(() => {
    refetch();
  }, []);

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading: isWithdrawing } = useWithdrawLoan({
    onSuccess: (res) => {
      successToast(res?.message);
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    mutate(id);
  };

  return (
    <Box>
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex
            flexDir="column"
            display={data?.status === "ACTIVE" ? "flex" : "none"}
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
                  {data?.purpose}
                </Flex>
              </Flex>

              <Flex align="center" w="50%" gap="140px">
                <Box color="#fff" fontWeight={700}>
                  <Box>
                    <Text opacity={0.4} fontSize="12px">
                      LEFT TO BE REPAID
                    </Text>
                    <Text mt="5px" fontSize="22px">
                      ₦ {Number(pending?.toFixed(0))?.toLocaleString()}
                    </Text>
                  </Box>

                  <Box mt="10px">
                    <Text opacity={0.4} fontSize="12px">
                      DUE DATE
                    </Text>
                    <Text mt="5px" fontSize="22px">
                      {formatDate(data?.dueDate)}
                    </Text>
                  </Box>
                </Box>

                <Box color="#fff" fontWeight={700}>
                  <Box>
                    <Text opacity={0.4} fontSize="12px">
                      AMOUNT LOANED
                    </Text>
                    <Text mt="5px" fontSize="22px">
                      ₦ {data?.amountLoaned?.toLocaleString()}
                    </Text>
                  </Box>

                  <Box mt="10px">
                    <Text opacity={0.4} fontSize="12px">
                      ISSUED DATE
                    </Text>
                    <Text mt="5px" fontSize="22px">
                      {formatDate(data?.createdAt)}
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

          <Flex
            flexDir="column"
            borderRadius="12px"
            border="1px solid #BAE0D9"
            p={{ base: "20px", md: "60px" }}
            pos="relative"
            display={data?.status === "ACTIVE" ? "none" : "flex"}
          >
            <Flex
              align="center"
              justifyContent="space-between"
              fontWeight={500}
              w="full"
              fontSize={{ base: "14px", md: "16px" }}
            >
              <Flex align="center" gap="16px">
                <Flex
                  justifyContent="center"
                  align="center"
                  border="1px solid #BAE0D9"
                  rounded="full"
                  py="4px"
                  color="#090C02"
                  px="10px"
                  opacity={0.6}
                >
                  Loan ID: {id}
                </Flex>
                <Flex
                  justifyContent="center"
                  align="center"
                  color="#075666"
                  border="1px solid #BAE0D9"
                  rounded="full"
                  py="4px"
                  px="10px"
                >
                  {data?.purpose}
                </Flex>
              </Flex>

              <Flex
                justifyContent="center"
                align="center"
                color={
                  LoanStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase(),
                  )?.color || ""
                }
                bg={
                  LoanStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase(),
                  )?.bg || ""
                }
                rounded="full"
                border="1px solid"
                borderColor={
                  LoanStatus.find(
                    (dat) =>
                      dat.name?.toLowerCase() === data?.status?.toLowerCase(),
                  )?.border || ""
                }
                py="4px"
                textTransform="capitalize"
                px="10px"
              >
                {data?.status === "REJECTED"
                  ? "Declined"
                  : data?.status === "REPAYMENT_IN_PROGRESS"
                    ? "Repayment In Progress"
                    : data?.status?.toLowerCase()}
              </Flex>
            </Flex>

            <Flex
              color="#090c02"
              align="center"
              mt="40px"
              display={
                data?.status === "PENDING" ||
                data?.status === "CANCELLED" ||
                data?.status === "DECLINED" ||
                data?.status === "WITHDRAWN"
                  ? "flex"
                  : "none"
              }
              flexWrap="wrap"
              justifyContent="space-between"
              w={{ base: "100%", md: "40%" }}
              gap={{ base: "20px", md: "unset" }}
            >
              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  AMOUNT REQUESTED
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  ₦ {data?.amountRequested?.toLocaleString()}
                </Text>
              </Box>

              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  DATE SUBMITTED
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  {formatDate(data?.createdAt)}
                </Text>
              </Box>
            </Flex>

            <Flex
              color="#090c02"
              align="center"
              mt="40px"
              display={
                data?.status === "PAID" ||
                data?.status === "APPROVED" ||
                data?.status === "REPAYMENT_IN_PROGRESS" ||
                data?.status === "ACTIVE"
                  ? "flex"
                  : "none"
              }
              flexWrap="wrap"
              justifyContent="space-between"
              gap={{ base: "20px", md: "unset" }}
            >
              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  LEFT TO BE REPAID
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  ₦ {Number(pending?.toFixed(0))?.toLocaleString()}
                </Text>
              </Box>

              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  DUE DATE
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  {formatDate(data?.dueDate) || "N/A"}
                </Text>
              </Box>

              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  AMOUNT{" "}
                  {data?.status === "PAID" ||
                  data?.status === "APPROVED" ||
                  data?.status === "REPAYMENT_IN_PROGRESS" ||
                  data?.status === "ACTIVE"
                    ? "APPROVED"
                    : "REQUESTED"}
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  ₦{" "}
                  {data?.amountLoaned
                    ? data?.amountLoaned?.toLocaleString()
                    : data?.amountRequested?.toLocaleString()}
                </Text>
              </Box>

              <Box fontWeight={700}>
                <Text opacity={0.4} fontSize="12px">
                  ISSUED DATE
                </Text>
                <Text mt="8px" fontSize={{ base: "20px", md: "24px" }}>
                  {formatDate(data?.approvedAt) || "N/A"}
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Box
            mt="24px"
            border="1px solid #BAE0D9"
            borderRadius="12px"
            display={data?.additionalComments ? "block" : "none"}
            py="16px"
            px="30px"
          >
            {data?.additionalComments}
          </Box>

          <Flex
            mt="24px"
            display={
              data?.status === "PAID" ||
              data?.status === "APPROVED" ||
              data?.status === "REPAYMENT_IN_PROGRESS" ||
              data?.status === "ACTIVE"
                ? "flex"
                : "none"
            }
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
                    {data?.repaymentPlans?.map((item, i) => (
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
              <DonutChart data={data} />
            </Box>
          </Flex>

          <Flex
            gap="24px"
            display={data?.status === "PENDING" ? "flex" : "none"}
            w={{ base: "100%", md: "30%" }}
            mt="24px"
            align="center"
          >
            <Button
              onClick={() => navigate(`/staff/loans/${id}/update`)}
              bg="transparent"
              border="1px solid #086375"
              color="#086375"
              borderRadius="8px"
              h="60px"
              w="full"
            >
              Edit
            </Button>
            <Button
              color="#fff"
              bg="#A11212"
              variant="adminPrimary"
              borderRadius="8px"
              h="60px"
              w="full"
              onClick={handleSubmit}
              isLoading={isWithdrawing}
            >
              Withdraw
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default LoanDetails;
