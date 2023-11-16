import React from "react";
import { Box, Button, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import {
  SecStatus,
  clientSubHeader,
  intervals,
} from "../../../common/constants";
import { formatDate } from "../../../../utils/helpers";
import { Add } from "../../../common/images";
import { useNavigate } from "react-router-dom";
import TableFormat from "../../../common/TableFormat";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  setLimit,
  limit,
}) => {
  const navigate = useNavigate();

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={clientSubHeader}
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
                <Td>{item?.membershipPlan?.name}</Td>

                <Td textAlign="center">
                  ₦{" "}
                  {item?.membershipPlan?.amount?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </Td>
                <Td textAlign="center">
                  {Object?.values(intervals[item?.membershipPlan?.interval])[0]}
                </Td>
                <Td textAlign="center">{formatDate(item?.nextPaymentDate)}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(SecStatus[item?.status])[0]}
                      bg={Object?.values(SecStatus[item?.status])[2]}
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(SecStatus[item?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDate(item?.createdAt)}</Td>
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
          <Image src="/assets/no-sub.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Subscription Data
          </Text>

          <Button
            onClick={() => navigate("/client/subscriptions/create")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a Subscription</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
