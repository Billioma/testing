import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import { adminRepSubHeader } from "../../../common/constants";
import { formatDateTime } from "../../../../utils/helpers";
import TableFormat from "../../../common/TableFormat";

const SubTableLayer = ({
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
            header={adminRepSubHeader}
            opt
            alignFirstHeader
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
              <Tr fontSize="14px" fontWeight={500} color="#646668" key={i}>
                <Td>{item?.customer || "N/A"}</Td>
                <Td>{item?.membershipPlan || "N/A"}</Td>
                <Td textAlign="center">
                  {formatDateTime(item?.startDate) || "N/A"}
                </Td>
                <Td textAlign="center">
                  {formatDateTime(item?.nextRenewal) || "N/A"}
                </Td>
                <Td textAlign="center">{item?.autoRenew || "N/A"}</Td>
                <Td textAlign="center">{item?.isCancelled || "N/A"}</Td>
                <Td textAlign="center">{item?.status || "N/A"}</Td>
                <Td textAlign="center">
                  {formatDateTime(item?.createdAt) || "N/A"}
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
          <Image src="/assets/sub.png" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Subscription Reports
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default SubTableLayer;
