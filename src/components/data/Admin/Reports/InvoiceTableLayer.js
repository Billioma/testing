import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import { adminRepInvoiceeHeader } from "../../../common/constants";
import { formatDateTimes } from "../../../../utils/helpers";
import TableFormat from "../../../common/TableFormat";

const InvoiceTableLayer = ({
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
            header={adminRepInvoiceeHeader}
            opt
            alignFirstHeader
            alignSecondHeader
            alignThirdHeader
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
                <Td>{item?.client || "N/A"}</Td>
                <Td>{item?.createdBy || "N/A"}</Td>
                <Td>{item?.paymentConfirmedBy || "N/A"}</Td>
                <Td textAlign="center">{item?.tax || "N/A"}</Td>
                <Td textAlign="center">
                  ₦{" "}
                  {item?.amountPayable?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </Td>
                <Td>
                  ₦{" "}
                  {item?.amountPaid?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </Td>
                <Td>{formatDateTimes(item?.datePaid) || "N/A"}</Td>
                <Td>{item?.paymentStatus}</Td>
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
          <Image src="/assets/no-log-rep.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Invoice Reports
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default InvoiceTableLayer;
