import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import { adminRepPaymentHeader } from "../../../common/constants";
import { formatDateTimes } from "../../../../utils/helpers";
import TableFormat from "../../../common/TableFormat";

const PaymentTableLayer = ({
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
            header={adminRepPaymentHeader}
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
              <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                <Td>{item?.location}</Td>
                <Td textAlign="center">{item?.zone}</Td>
                <Td textAlign="center">{item?.attendant}</Td>
                <Td textAlign="center">₦ {item?.amount?.toLocaleString()}</Td>

                <Td textAlign="center">
                  ₦ {item?.amountPaid?.toLocaleString()}
                </Td>
                <Td textAlign="center">{item?.customer}</Td>
                <Td textAlign="center">{item?.vehicle}</Td>
                <Td>{item?.serviceType}</Td>
                <Td textAlign="center">{item?.paymentMethod || "N/A"}</Td>
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
          <Image src="/assets/no-pay.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Payment Reports
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default PaymentTableLayer;
