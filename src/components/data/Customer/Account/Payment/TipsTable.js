import React from "react";
import { Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import { formatDateNewTime } from "../../../../../utils/helpers";
import { Status, tipsHeader } from "../../../../common/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import TableFormat from "../../../../common/TableFormat";

const TipsTable = ({ isTips, setPage, paymentTips, page, limit }) => {
  return (
    <TableFormat
      opt
      maxH={"45vh"}
      isLoading={isTips}
      minH="20vh"
      header={tipsHeader}
      paginate={
        <Flex justifyContent="center" align="center" flexDir="column" w="full">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            justifyContent="center"
            gap={{ base: "10px", md: "32px" }}
            align="center"
          >
            <Text fontSize="14px" color="#242628" lineHeight="100%">
              Showing rows {page === 1 ? 1 : (page - 1) * limit + 1} to{" "}
              {paymentTips?.pageCount === page
                ? page * limit > paymentTips?.total
                  ? paymentTips?.total
                  : page * limit
                : page * limit}{" "}
              of {paymentTips?.total}
            </Text>

            <Flex gap="16px" fontSize="14px" align="center">
              <Flex
                opacity={paymentTips?.page === 1 ? 0.5 : 1}
                onClick={() =>
                  paymentTips?.page !== 1 ? setPage(page - 1) : ""
                }
                cursor={paymentTips?.page === 1 ? "" : "pointer"}
                align="center"
                gap="2px"
                color="#A4A6A8"
              >
                <IoIosArrowBack />
                <Text lineHeight="100%">Previous</Text>
              </Flex>
              <Flex color="#242628" lineHeight="100%">
                <Text>{paymentTips?.page}</Text>
              </Flex>

              <Flex
                opacity={paymentTips?.page === paymentTips?.pageCount ? 0.5 : 1}
                onClick={() =>
                  paymentTips?.page !== paymentTips?.pageCount
                    ? setPage(page + 1)
                    : ""
                }
                cursor={
                  paymentTips?.page === paymentTips?.pageCount ? "" : "pointer"
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
      {paymentTips?.data?.length ? (
        paymentTips?.data?.map((dat, i) => (
          <Tr
            key={i}
            color="#646668"
            fontWeight={500}
            fontSize="14px"
            lineHeight="100%"
          >
            <Td textAlign="center">{dat?.serviceLog?.id}</Td>

            <Td textAlign="center">
              ₦{" "}
              {dat?.amount?.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              }) || "0.00"}
            </Td>

            <Td textAlign="center">
              {dat?.paymentMethod === 1 ? "Wallet" : "Card"}
            </Td>

            <Td>
              <Flex justifyContent="center" align="center" w="full">
                <Flex
                  color={
                    Object.values(Status[dat?.serviceLog?.paymentStatus])[0]
                  }
                  bg={Object.values(Status[dat?.serviceLog?.paymentStatus])[2]}
                  py="5px"
                  px="16px"
                  justifyContent="center"
                  w="fit-content"
                  borderRadius="4px"
                  align="center"
                >
                  {Object.values(Status[dat?.serviceLog?.paymentStatus])[1]}
                </Flex>
              </Flex>
            </Td>
            <Td textAlign="center">{formatDateNewTime(dat?.createdAt)}</Td>
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
                  fontSize="13px"
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

export default TipsTable;
