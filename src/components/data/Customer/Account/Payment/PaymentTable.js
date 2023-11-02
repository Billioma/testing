import React from "react";
import { Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import { formatDate } from "../../../../../utils/helpers";
import {
  PaymentMethods,
  Status,
  TransactionTypes,
  paymentHeader,
} from "../../../../common/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import TableFormat from "../../../../common/TableFormat";

const PaymentTable = ({ isLoading, setPage, paymentHistory, page, limit }) => {
  return (
    <TableFormat
      opt
      maxH={"45vh"}
      isLoading={isLoading}
      minH="20vh"
      header={paymentHeader}
      paginate={
        <Flex justifyContent="center" align="center" flexDir="column" w="full">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            justifyContent="center"
            gap={{ base: "10px", md: "32px" }}
            align="center"
          >
            <Text fontSize="12px" color="#242628" lineHeight="100%">
              Showing rows {page === 1 ? 1 : (page - 1) * limit + 1} to{" "}
              {paymentHistory?.pageCount === page
                ? page * limit > paymentHistory?.total
                  ? paymentHistory?.total
                  : page * limit
                : page * limit}{" "}
              of {paymentHistory?.total}
            </Text>

            <Flex gap="16px" fontSize="12px" align="center">
              <Flex
                opacity={paymentHistory?.page === 1 ? 0.5 : 1}
                onClick={() =>
                  paymentHistory?.page !== 1 ? setPage(page - 1) : ""
                }
                cursor={paymentHistory?.page === 1 ? "" : "pointer"}
                align="center"
                gap="2px"
                color="#A4A6A8"
              >
                <IoIosArrowBack />
                <Text lineHeight="100%">Previous</Text>
              </Flex>
              <Flex color="#242628" lineHeight="100%">
                <Text>{paymentHistory?.page}</Text>
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
              }) || "0.00"}
            </Td>

            <Td textAlign="center">
              {PaymentMethods?.find((item, i) => i === dat?.paymentMethod)}
            </Td>

            <Td textAlign="center">
              <Flex justifyContent="center" align="center" w="full">
                <Flex
                  flexDir="column"
                  bg="#F4F6F8"
                  w="fit-content"
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
              </Flex>
            </Td>

            <Td>
              <Flex justifyContent="center" align="center" w="full">
                <Flex
                  color={Object.values(Status[dat?.status])[0]}
                  bg={Object.values(Status[dat?.status])[2]}
                  py="5px"
                  px="16px"
                  justifyContent="center"
                  w="fit-content"
                  borderRadius="4px"
                  align="center"
                >
                  {Object.values(Status[dat?.status])[1]}
                </Flex>
              </Flex>
            </Td>
            <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
          </Tr>
        ))
      ) : (
        <Tr>
          <Td colSpan={7} rowSpan={2}>
            <Flex
              textAlign="center"
              justifyContent="center"
              mt="30px"
              align="center"
              w="full"
            >
              <Flex
                textAlign="center"
                justifyContent="center"
                align="center"
                flexDir="column"
                border="1px solid #e4e6e8"
                borderRadius="8px"
                py="16px"
                px="24px"
                w="fit-content"
              >
                <Image src="/assets/no-sub.jpg" w="48px" h="48px" />

                <Text
                  my="16px"
                  color="#646668"
                  lineHeight="100%"
                  fontWeight={700}
                >
                  No Recent Activity
                </Text>
                <Text
                  fontSize="11px"
                  color="#A4A6A8"
                  fontWeight={500}
                  lineHeight="100%"
                >
                  Make use of any of our parking services
                </Text>
              </Flex>
            </Flex>
          </Td>
        </Tr>
      )}
    </TableFormat>
  );
};

export default PaymentTable;
