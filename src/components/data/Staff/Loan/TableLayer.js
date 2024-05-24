import React from "react";
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Box,
  Th,
  Thead,
  Tr,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { LoanStatus } from "../../../common/constants";
import TableLoader from "../../../loader/TableLoader";
import { formatDate } from "../../../../utils/helpers";
import Pagination from "../../../common/Pagination";
import { useNavigate } from "react-router-dom";

const TableLayer = ({
  startRow,
  endRow,
  isLoading,
  limit,
  data,
  setPage,
  page,
  setLimit,
}) => {
  const navigate = useNavigate();
  return (
    <Box mt="24px">
      {isLoading ? (
        <TableLoader />
      ) : data?.loanRequests?.length ? (
        <>
          <TableContainer>
            <Table>
              <Thead>
                <Tr h="73px" alignContent="center" mb="14px" bg="#CEDFE3">
                  {[
                    "Amount",
                    "Status",
                    "Request Date",
                    "Repayment Schedule",
                  ].map((header, i) => (
                    <Th
                      key={i}
                      fontFamily="Satoshi"
                      color="#086375"
                      textAlign="center"
                      fontSize={{ base: "13px", md: "18px" }}
                      textTransform="capitalize"
                      _first={{
                        borderLeftRadius: "12px",
                        pl: "20px",
                      }}
                      _last={{
                        borderRightRadius: "12px",
                        pr: "0",
                      }}
                    >
                      {header}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Box h="14px"></Box>
              <Tbody>
                {data?.loanRequests?.map((item, i) => (
                  <Tr
                    key={i}
                    h="80px"
                    fontSize={{ base: "13px", md: "18px" }}
                    color="#090c02"
                    fontWeight={500}
                    alignContent="center"
                  >
                    <Td
                      textAlign="center"
                      border="1px solid #CEDFE3"
                      borderRight="none"
                    >
                      ₦ {item?.amountRequested?.toLocaleString() || "0"}
                    </Td>
                    <Td
                      border="1px solid #CEDFE3"
                      borderRight="none"
                      borderLeft="none"
                    >
                      <Flex align="center" w="full" justifyContent="center">
                        <Flex
                          textTransform="capitalize"
                          color={
                            LoanStatus.find(
                              (dat) =>
                                dat.name?.toLowerCase() ===
                                item?.status?.toLowerCase()
                            )?.color || ""
                          }
                          bg={
                            LoanStatus.find(
                              (dat) =>
                                dat.name?.toLowerCase() ===
                                item?.status?.toLowerCase()
                            )?.bg || ""
                          }
                          justifyContent="center"
                          align="center"
                          py="4px"
                          px="10px"
                          rounded="full"
                          fontSize={{ base: "13px", md: "16px" }}
                          w="fit-content"
                        >
                          {item?.status === "REJECTED"
                            ? "Declined"
                              : item?.status === "REPAYMENT_IN_PROGRESS"
                                ? "Repayment In Progress"
                                : item?.status?.toLowerCase()}
                        </Flex>
                      </Flex>
                    </Td>

                    <Td
                      textAlign="center"
                      border="1px solid #CEDFE3"
                      borderRight="none"
                      borderLeft="none"
                    >
                      {formatDate(item?.createdAt)}
                    </Td>
                    <Td
                      textAlign="center"
                      border="1px solid #CEDFE3"
                      borderLeft="none"
                      onClick={() => navigate(`/staff/loans/${item?.id}`)}
                      textDecor="underline"
                      cursor="pointer"
                      color="#086375"
                    >
                      View
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Pagination
            paginationValues={{
              startRow,
              endRow,
              total: data?.total,
              page: data?.page,
              pageCount: data?.pageCount,
              onNext: () =>
                data?.page !== data?.pageCount ? setPage(page + 1) : null,
              onPrevious: () => (data?.page !== 1 ? setPage(page - 1) : null),
              setLimit,
              limit,
            }}
            useDefaultPagination
          />
        </>
      ) : (
        <Flex
          h="55vh"
          gap="49px"
          justifyContent="center"
          align="center"
          flexDir="column"
        >
          <Image
            src="/assets/no-leave.jpg"
            w="115px"
            h="129px"
            objectFit="contain"
          />
          <Box textAlign="center">
            <Text fontSize="28px" fontWeight={700}>
              No Loan History Found
            </Text>
            <Text mt="4px">Please request loan to get started</Text>

            <Button
              mt="24px"
              w="50%"
              h="60px"
              onClick={() => navigate("/loans/request")}
              z
            >
              Request Loan
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
