import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";
import TableLayer from "../../../components/data/Staff/Loan/TableLayer";
import {
  useGetLoanBalance,
  useGetLoanRequest,
} from "../../../services/staff/query/loan";
import { Button, Skeleton, Spinner } from "@chakra-ui/react";
import { useGetUser } from "../../../services/staff/query/user";
import { formatDate } from "../../../utils/helpers";

const Loans = () => {
  const navigate = useNavigate();
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const { data: userData } = useGetUser();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const {
    data: balance,
    refetch: balanceRefetch,
    isLoading: isBalance,
  } = useGetLoanBalance({
    refetchOnWindowFocus: true,
  });
  const { data, isLoading, refetch } = useGetLoanRequest(
    {
      refetchOnWindowFocus: true,
    },
    page,
    limit
  );

  useEffect(() => {
    refetch();
    balanceRefetch();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = data?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit]);

  useEffect(() => {
    sessionStorage.removeItem("activeLoan");
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : !userData?.isLoanEligible ? (
        <Flex
          h="55vh"
          gap="49px"
          justifyContent="center"
          align="center"
          flexDir="column"
        >
          <Image
            src="/assets/no-leave.jpg"
            w="180px"
            h="180px"
            objectFit="contain"
          />
          <Text
            textTransform="capitalize"
            textAlign="center"
            w={{ base: "100%", md: "30rem" }}
            fontSize="28px"
            fontWeight={700}
          >
            You are <span style={{ color: "#086375" }}>not eligible</span> to
            take a loan at the moment
          </Text>
        </Flex>
      ) : !data?.loanRequests?.length && !data?.activeLoanRequest ? (
        <Flex
          h="55vh"
          gap="49px"
          justifyContent="center"
          align="center"
          flexDir="column"
        >
          <Image
            src="/assets/no-leave.jpg"
            w="180px"
            h="180px"
            objectFit="contain"
          />
          <Flex
            mt="24px"
            justifyContent="center"
            align="center"
            textAlign="center"
          >
            <Box>
              <Text fontSize="28px" fontWeight={700}>
                Loan Balance: ₦{" "}
                {balance?.data?.loanBalance < 0 ||
                balance?.data?.loanBalance === 0
                  ? "0"
                  : (balance?.data?.loanBalance).toLocaleString()}{" "}
              </Text>
              <Text>No loan history found.</Text>

              <Button
                mt="24px"
                onClick={() => navigate("/staff/loans/request")}
                h="60px"
                w={{ base: "100%", md: "60%" }}
              >
                Request Loan
              </Button>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Box>
          <Box>
            <Text
              fontSize={{ base: "35px", md: "48px" }}
              fontWeight={500}
              color="#090c02"
            >
              Loan History
            </Text>
            <Text
              fontSize={{ base: "", md: "18px" }}
              opacity={0.5}
              display={data?.loanRequests?.length ? "block" : "none"}
              color="#090c02"
            >
              The table displays your history of loan transactions. For extra
              information or assistance, please contact adminstrator
            </Text>

            <Flex
              flexDir="column"
              justifyContent="center"
              display={data?.activeLoanRequest ? "flex" : "none"}
              h="168px"
              borderRadius="12px"
              onClick={() => {
                navigate(`/staff/loans/${data?.activeLoanRequest?.id}`);
                // sessionStorage.setItem(
                //   "activeLoan",
                //   JSON.stringify(data?.activeLoanRequest)
                // );
              }}
              cursor="pointer"
              bg="#075666"
              px="50px"
              my="24px"
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

                <Flex align="center" gap="50px">
                  <Box fontWeight={700}>
                    <Text color="#fff" opacity={0.4} fontSize="12px">
                      LEFT TO BE REPAID
                    </Text>
                    <Text mt="8px" color="#fff" fontSize="24px">
                      ₦{" "}
                      {data?.activeLoanRequest?.amountLeftToBePaid?.toLocaleString()}
                    </Text>
                  </Box>

                  <Box fontWeight={700}>
                    <Text color="#fff" opacity={0.4} fontSize="12px">
                      DUE DATE
                    </Text>
                    <Text mt="8px" color="#fff" fontSize="24px">
                      {formatDate(data?.activeLoanRequest?.dueDate)}
                    </Text>
                  </Box>

                  <Box fontWeight={700}>
                    <Text color="#fff" opacity={0.4} fontSize="12px">
                      AMOUNT LOANED
                    </Text>
                    <Text mt="8px" color="#fff" fontSize="24px">
                      ₦{" "}
                      {data?.activeLoanRequest?.amountLoaned?.toLocaleString()}
                    </Text>
                  </Box>

                  <Box fontWeight={700}>
                    <Text color="#fff" opacity={0.4} fontSize="12px">
                      ISSUED DATE
                    </Text>
                    <Text mt="8px" color="#fff" fontSize="24px">
                      {formatDate(data?.activeLoanRequest?.createdAt)}
                    </Text>
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
              display={data?.loanRequests?.length ? "block" : "none"}
            >
              <Skeleton w="full" isLoaded={!isBalance} borderRadius="20px">
                <Flex
                  align="center"
                  border="1px solid #086375"
                  borderRadius="20px"
                  p={{ base: "25px", md: "40px" }}
                  justifyContent="space-between"
                  w="full"
                >
                  <Box color="#086375" fontWeight={700}>
                    <Text fontSize="12px" opacity={0.4}>
                      LOAN BALANCE
                    </Text>
                    <Text mt="4px" fontSize={{ base: "20px", md: "24px" }}>
                      ₦ {balance?.data?.loanBalance?.toLocaleString()}
                    </Text>
                  </Box>

                  <Box>
                    <Flex
                      align="center"
                      gap="10px"
                      bg="#086375"
                      borderRadius="8px"
                      py={{ base: "13px", md: "16px" }}
                      cursor="pointer"
                      onClick={() => navigate("/staff/loans/request")}
                      _hover={{ opacity: 0.8 }}
                      transition=".3s ease-in-out"
                      px={{ base: "13px", md: "24px" }}
                    >
                      <Image src="/assets/copy.svg" />
                      <Text
                        color="#fff"
                        fontWeight={500}
                        fontSize={{ base: "13px", md: "16px" }}
                      >
                        Request Loan
                      </Text>
                    </Flex>
                  </Box>
                </Flex>
              </Skeleton>
            </Box>
          </Box>

          <Box display={data?.loanRequests?.length ? "block" : "none"}>
            <TableLayer
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              data={data}
              startRow={startRow}
              endRow={endRow}
              limit={limit}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Loans;
