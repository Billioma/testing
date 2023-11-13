import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import { adminTipsHeader } from "../../../common/constants";
import { formatDateTimes } from "../../../../utils/helpers";
import TableFormat from "../../../common/TableFormat";

const TipsTableLayer = ({
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
            header={adminTipsHeader}
            opt
            alignFirstHeader
            alignThirdHeader
            alignSecondHeader
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
              <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                <Td>{item?.ticketNumber}</Td>
                <Td>{item?.customer}</Td>
                <Td>{item?.attendant}</Td>
                <Td textAlign="center">
                  ₦ {item?.amount?.toLocaleString() || "0.00"}
                </Td>
                <Td textAlign="center">{item?.location}</Td>
                <Td textAlign="center">{item?.licensePlate}</Td>

                <Td textAlign="center">{formatDateTimes(item?.createdAt)}</Td>
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
          <Image src="/assets/no-log-rep.png" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Tips Reports
          </Text>
        </Flex>
      )}{" "}
    </Box>
  );
};

export default TipsTableLayer;
