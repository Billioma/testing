import React, { useState } from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";

import { NewStatus } from "../../../common/constants";

const LoanHistory = ({ page, setPage, startRow = 1, endRow }) => {
  const headers = [
    "LOAN ID",
    "AMOUNT REQUESTED",
    "REPAYMENT TENURE",
    "DUE DATE",
    "STATUS",
    "ACTIONS",
  ];
  const data = {
    total: 3,
    pageCount: 1,
    page: 1,
    data: [
      {
        loanId: "12324",
        amount: "100,000",
        repaymentTenure: "2 Months",
        status: 2,
        dueDate: "2024-03-13",
      },
      {
        loanId: "48493",
        amount: "50,000",
        repaymentTenure: null,
        status: 0,
        dueDate: "2024-03-13",
      },
      {
        loanId: "04832",
        amount: "80,000",
        repaymentTenure: "2 Months",
        status: 1,
        dueDate: "2024-03-13",
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
        alignThirdHeader
        alignFifthHeader
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
            <Td>{item?.loanId}</Td>
            <Td>₦ {item?.amount?.toLocaleString()}</Td>
            <Td>{item?.repaymentTenure || "N/A"}</Td>
            <Td>{item?.dueDate}</Td>
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

export default LoanHistory;
