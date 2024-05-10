import React, { useState } from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";

import { LeaveStatus } from "../../../common/constants";
import { useNavigate } from "react-router-dom";
import TableLoader from "../../../loaders/TableLoader";
import { formatDateNewTime } from "../../../../utils/helpers";

const TableLayer = ({
  type,
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
    "STAFF ID",
    "STAFF NAME",
    "START DATE",
    "END DATE",
    "REQUEST DATE",
    "STATUS",
    "ACTIONS",
  ];

  const navigate = useNavigate();

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={
              type !== ""
                ? headers?.slice(0, 5)?.concat(headers?.slice(6, 7))
                : headers
            }
            opt
            alignFirstHeader
            alignSecondHeader
            alignThirdHeader
            alignForthHeader
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
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{item?.staff?.id}</Td>
                <Td>{item?.staff?.fullName}</Td>
                <Td>{formatDateNewTime(item?.startDate)}</Td>
                <Td>{formatDateNewTime(item?.endDate)}</Td>
                <Td textAlign="center">{formatDateNewTime(item?.createdAt)}</Td>
                <Td display={type === "" ? "" : "none"}>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={
                        LeaveStatus.find(
                          (dat) =>
                            dat.name?.toLowerCase() ===
                            item?.status?.toLowerCase()
                        )?.color || ""
                      }
                      bg={
                        LeaveStatus.find(
                          (dat) =>
                            dat.name?.toLowerCase() ===
                            item?.status?.toLowerCase()
                        )?.bg || ""
                      }
                      justifyContent={"center"}
                      alignItems="center"
                      py="5px"
                      px="16px"
                      textTransform="capitalize"
                      borderRadius="4px"
                    >
                      {item?.status === "REJECTED"
                        ? "Declined"
                        : item?.status?.toLowerCase()}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" align="center">
                    <Text
                      onClick={() => navigate(`/admin/leave-mgt/${item?.id}`)}
                      textDecor="underline"
                      cursor="pointer"
                    >
                      View
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </TableFormat>{" "}
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-loc.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Leave Request Data
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
