import React, { useState } from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import {
  PaymentMethods,
  Status,
  TransactionTypes,
  paymentHeader,
} from "../../../../common/constants";
import NoData from "../../../../common/NoData";
import { formatDate } from "../../../../../utils/helpers";
import { useGetPaymentHistory } from "../../../../../services/customer/query/payment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TableLayer = () => {
  const [page, setPage] = useState(1);
  const limit = 25;
  const { isLoading, data: paymentHistory } = useGetPaymentHistory(limit, page);

  return (
    <Box mt="32px">
      <TableFormat
        maxH={"45vh"}
        isLoading={isLoading}
        minH="20vh"
        header={paymentHeader}
        title={
          <Flex>
            <Text
              color="#242628"
              fontSize="14px"
              lineHeight="100%"
              fontWeight={500}
            >
              Payment History
            </Text>
          </Flex>
        }
        paginate={
          <Flex
            justifyContent="center"
            align="center"
            flexDir="column"
            w="full"
          >
            <Flex justifyContent="center" gap="32px" align="center">
              <Text fontSize="12px" color="#242628" lineHeight="100%">
                Showing rows 1 to {limit} of {paymentHistory?.total}
              </Text>

              <Flex gap="16px" align="center">
                <Flex
                  opacity={paymentHistory?.page === 1 ? 0.5 : 1}
                  onClick={() =>
                    paymentHistory?.page !== 1 ? setPage(page - 1) : ""
                  }
                  cursor={paymentHistory?.page === 1 ? "" : "pointer"}
                  align="center"
                  gap="2px"
                  color="#A4A6A8"
                  fontSize="12px"
                >
                  <IoIosArrowBack />
                  <Text lineHeight="100%">Previous</Text>
                </Flex>

                <Flex align="center" gap="5px" color="#A4A6A8" fontSize="12px">
                  <Flex
                    bg="tranparent"
                    py="6px"
                    px="8px"
                    color="#242628"
                    fontSize="12px"
                    lineHeight="100%"
                  >
                    <Text>{paymentHistory?.page}</Text>
                  </Flex>
                  <Text fontWeight={500} fontSize="12px">
                    -{" "}
                  </Text>
                  <Flex
                    bg="#242628"
                    py="6px"
                    px="8px"
                    color="#fff"
                    fontSize="12px"
                    lineHeight="100%"
                  >
                    <Text>{paymentHistory?.pageCount}</Text>
                  </Flex>
                </Flex>

                <Flex
                  opacity={
                    paymentHistory?.page === paymentHistory?.pageCount ? 0.5 : 1
                  }
                  onClick={() =>
                    paymentHistory?.page !== paymentHistory?.pageCount
                      ? setPage(page + 1)
                      : ""
                  }
                  cursor={
                    paymentHistory?.page === paymentHistory?.pageCount
                      ? ""
                      : "pointer"
                  }
                  align="center"
                  gap="2px"
                  color="#A4A6A8"
                  fontSize="12px"
                >
                  <IoIosArrowForward />
                  <Text lineHeight="100%">Next</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        }
      >
        {paymentHistory?.data?.length ? (
          paymentHistory?.data?.map((dat, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td textAlign="center">{dat?.transactionId}</Td>

              <Td textAlign="center">
                ₦{" "}
                {dat?.amount?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Td>

              <Td textAlign="center">
                {PaymentMethods?.find((item, i) => i === dat?.paymentMethod)}
              </Td>

              <Td textAlign="center">
                <Flex
                  flexDir="column"
                  bg="#F4F6F8"
                  borderRadius="4px"
                  px="16px"
                  py="8px"
                >
                  {TransactionTypes?.find(
                    (item, i) => i === dat?.transactionType
                  )
                    ?.replace("_", " ")
                    ?.replace("_", " ")}
                </Flex>
              </Td>

              <Td>
                <Flex
                  color={Object.values(Status[dat?.status])[0]}
                  bg={Object.values(Status[dat?.status])[2]}
                  py="5px"
                  px="16px"
                  justifyContent="center"
                  borderRadius="4px"
                  align="center"
                >
                  {Object.values(Status[dat?.status])[1]}
                </Flex>
              </Td>
              <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
              <Td>
                <Flex justifyContent="center" align="center">
                  <FiMoreVertical />
                </Flex>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={7} rowSpan={2}>
              <NoData
                title="No Service"
                desc="You have not initiated a service"
              />
            </Td>
          </Tr>
        )}
      </TableFormat>
    </Box>
  );
};

export default TableLayer;
