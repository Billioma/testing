import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import {
  PaymentMethods,
  TransactionTypes,
  adminRepTranHeader,
} from "../../../common/constants";
import { formatDateNewTime } from "../../../../utils/helpers";
import TableFormat from "../../../common/TableFormat";

const HistoryTableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={adminRepTranHeader}
            opt
            alignFirstHeader
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
          >
            {data?.data?.map((item, i) => (
              <Tr fontSize="14px" fontWeight={500} color="#646668" key={i}>
                <Td>{item?.transactionId}</Td>
                <Td textAlign="center">
                  ₦{" "}
                  {item?.amount?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      bg="#F4F6F8"
                      w="fit-content"
                      align="center"
                      justifyContent="center"
                      py="7px"
                      px="15px"
                      borderRadius="4px"
                    >
                      {PaymentMethods?.find(
                        (dat, i) => i === item?.paymentMethod
                      )}
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      bg="#F4F6F8"
                      align="center"
                      justifyContent="center"
                      py="7px"
                      px="15px"
                      borderRadius="4px"
                      fontSize={12}
                      w="fit-content"
                    >
                      <Text whiteSpace={"pre-wrap"} w="full">
                        {TransactionTypes?.find(
                          (dat, i) => i === item?.transactionType
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{item?.customer?.email || "N/A"}</Td>
                <Td textAlign="center">{formatDateNewTime(item?.createdAt)}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      bg="#F4F6F8"
                      align="center"
                      justifyContent="center"
                      py="6px"
                      w="fit-content"
                      px="15px"
                      borderRadius="4px"
                    >
                      {item?.status ? "Successful" : "Failed"}
                    </Flex>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </TableFormat>
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-pay.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Payment History Reports
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default HistoryTableLayer;
