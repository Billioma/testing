import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../../common/TableFormat";
import TableLoader from "../../../../loaders/TableLoader";

const GridTable = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  const locationKeys = [
    ...new Set(data?.data?.flatMap((item) => Object.keys(item.locations))),
  ];

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            alignIndices={[0]}
            header={["Date", ...locationKeys]}
            opt
            br
            paginationValues={{
              startRow,
              endRow,
              total: data?.total,
              page: Number(data?.page),
              pageCount: data?.pageCount,
              onNext: () =>
                Number(data?.page) !== data?.pageCount
                  ? setPage(page + 1)
                  : null,
              onPrevious: () =>
                Number(data?.page) !== 1 ? setPage(page - 1) : null,
              setLimit,
              limit,
            }}
            useDefaultPagination
          >
            {data?.data?.map((audit, i) => (
              <Tr key={i} color="#707880" fontWeight={500} fontSize="12px">
                <Td borderRight="1px solid #E2E5DC">{audit.date}</Td>

                {locationKeys.map((location, idx) => {
                  const status = audit.locations[location] || "-";
                  return (
                    <Td
                      key={idx}
                      bg={
                        status === "PASS"
                          ? "#E5FFE5"
                          : status === "FAIL"
                          ? "#FEF1F1"
                          : ""
                      }
                      color={
                        status === "PASS"
                          ? "#0B841D"
                          : status === "FAIL"
                          ? "#EE383A"
                          : ""
                      }
                      textAlign="center"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {status?.toLowerCase()}
                    </Td>
                  );
                })}
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
          <Image src="/assets/no-loc.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Manager Sales Report
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default GridTable;
