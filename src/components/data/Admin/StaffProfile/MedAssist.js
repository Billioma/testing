import React, { useState } from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";

import { NewStatus } from "../../../common/constants";

const MedAssist = ({ page, setPage, startRow = 1, endRow }) => {
  const headers = [
    "AMOUNT",
    "APPROVED BY",
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
        amount: "150,000",
        approvedBy: null,
        status: 2,
        requestDate: "2024-03-13",
      },
      {
        amount: "40,000",
        approvedBy: "Adenike Ajibole",
        status: 2,
        requestDate: "2024-03-13",
      },
      {
        amount: "100,000",
        approvedBy: "Adenike Ajibole",
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
          <Tr
            key={i}
            color="#646668"
            fontWeight={500}
            fontSize="14px"
            lineHeight="100%"
          >
            <Td>₦ {item?.amount?.toLocaleString()}</Td>
            <Td>
              {!item?.approvedBy ? (
                "N/A"
              ) : (
                <Flex align="center" w="full" >
                  <Flex
                    border="1px solid #D4D6D8"
                    align="center"
                    gap="8px"
                    w="fit-content"
                    borderRadius="100px"
                    p="4px"
                  >
                    <Flex rounded="full" bg="#D9D9D9" w="16px" h="16px"></Flex>
                    <Text color="#090c02">{item?.approvedBy || ""}</Text>
                  </Flex>
                </Flex>
              )}
            </Td>
            <Td>{item?.requestDate}</Td>
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

export default MedAssist;
