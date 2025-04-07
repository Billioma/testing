import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import { formatDateNewTime } from "../../../../../utils/helpers";
import TableLoader from "../../../../loaders/TableLoader";
import TableFormat from "../../../../common/TableFormat";

const Table = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  const headers = [
    "TICKET NUMBER",
    "AMOUNT REQUESTED",
    "TIME",
    "PAYMENT METHOD ",
  ];

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={headers}
            opt
            alignIndices={[0, 1]}
            paginationValues={{
              startRow,
              endRow,
              total: data?.total,
              page: Number(data?.page),
              pageCount: data?.pageCount,
              onNext: () =>
                Number(data?.page) !== data?.pageCount
                  ? setPage(page + 1)
                  : null,
              onPrevious: () =>
                Number(data?.page) !== 1 ? setPage(page - 1) : null,
              setLimit,
              limit,
            }}
            useDefaultPagination
          >
            {data?.data?.map((trans, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{trans?.id}</Td>
                <Td textTransform="capitalize">
                  ₦ {Number(trans?.amount)?.toLocaleString()}
                </Td>
                <Td textAlign="center">
                  {formatDateNewTime(trans?.createdAt)}
                </Td>
                <Td textAlign="center" textTransform="capitalize">
                  {trans?.paymentMethod?.toLowerCase()}
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
          <Image src="/assets/no-user.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Transactions Data
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Table;
