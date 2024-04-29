import React, { useState } from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";

import { NewStatus } from "../../../common/constants";

const LeaveHistory = ({ page, setPage, startRow = 1, endRow }) => {
  const headers = [
    "START DATE",
    "END DATE",
    "REQUEST DATE",
    "STATUS",
    "ACTIONS",
  ];
  const data = {
    total: 3,
    pageCount: 1,
    page: 1,
    data: [
      {
        startDate: "2024-03-13",
        endDate: "2024-03-13",
        status: 2,
        requestDate: "2024-03-13",
      },
      {
        startDate: "2024-03-13",
        endDate: "2024-03-13",
        status: 2,
        requestDate: "2024-03-13",
      },
      {
        startDate: "2024-03-13",
        endDate: "2024-03-13",
        status: 2,
        requestDate: "2024-03-13",
      },
    ],
  };

  const [limit, setLimit] = useState(25);

  return (
    <Box mt="24px">
      <TableFormat
        header={headers}
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
          <Tr
            key={i}
            color="#646668"
            fontWeight={500}
            fontSize="14px"
            lineHeight="100%"
          >
            <Td>{item?.startDate}</Td>
            <Td>{item?.endDate}</Td>
            <Td textAlign="center">{item?.requestDate}</Td>
            <Td>
              <Flex align="center" w="full" justifyContent="center">
                <Flex
                  color={Object?.values(NewStatus[item?.status])[0]}
                  bg={Object?.values(NewStatus[item?.status])[2]}
                  justifyContent={"center"}
                  alignItems="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                >
                  {Object?.values(NewStatus[item?.status])[1]}
                </Flex>
              </Flex>
            </Td>
            <Td textAlign="center">
              <Flex justifyContent="center" align="center">
                <Text textDecor="underline" cursor="pointer">
                  View
                </Text>
              </Flex>
            </Td>
          </Tr>
        ))}
      </TableFormat>
    </Box>
  );
};

export default LeaveHistory;
