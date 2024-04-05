import React from "react";
import { Box, Flex, Td, Text, Tr, Image } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import TableLoader from "../../../loaders/TableLoader";
import { useNavigate } from "react-router-dom";

const TableLayer = ({
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
    "NAME",
    "CUSTOMER EMAIL",
    "TYPE",
    "STATUS",
    "DATE CREATED",
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
                <Td>{item?.senderName}</Td>
                <Td>{item?.senderEmail}</Td>

                <Td textAlign="center">
                  <Flex justifyContent="center" align="center">
                    <Flex
                      justifyContent="center"
                      align="center"
                      py="6px"
                      px="15px"
                      w="fit-content"
                      bg={
                        item?.type === "FEEDBACK"
                          ? "#E5FFE5"
                          : item?.type === "COMPLAINT"
                          ? "#FEF1F1"
                          : "#FDF6E7"
                      }
                      color={
                        item?.type === "FEEDBACK"
                          ? "#0B841D"
                          : item?.type === "COMPLAINT"
                          ? "#EE383A"
                          : "#F79E1B"
                      }
                      borderRadius="6px"
                      textTransform="capitalize"
                    >
                      {item?.type.toLowerCase()}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" align="center">
                    <Flex
                      justifyContent="center"
                      align="center"
                      py="6px"
                      px="15px"
                      w="fit-content"
                      borderRadius="6px"
                      bg={item?.isReplied ? "#E5FFE5" : "#FEF1F1"}
                      color={item?.isReplied ? "#0B841D" : "#EE383A"}
                      textTransform="capitalize"
                    >
                      {item?.isReplied ? "Replied" : "Unreplied"}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDateNewTime(item?.createdAt)}</Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" align="center">
                    <Text
                      textDecor="underline"
                      cursor="pointer"
                      onClick={() =>
                        navigate(`/admin/support/feedback/${item?.id}`)
                      }
                    >
                      View
                    </Text>
                  </Flex>
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
          <Image src="/assets/no-feedback.svg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Feedback Data
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;
