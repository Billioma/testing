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
  start,
  end,
  endRow,
  limit,
  setLimit,
}) => {
  const getDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    while (startDate <= endDate) {
      dateArray.push(startDate.toISOString().split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
    }

    return dateArray;
  };

  const dateRange = getDateRange(start, end);

  const filledGrid = dateRange?.map((date) => {
    const existingData = data?.grid?.find((item) => item.date === date);

    return (
      existingData || {
        date,
        passCount: 0,
        passPercentage: "0.0",
        failCount: 0,
        unAccountedFor: "0.0",
      }
    );
  });

  const tableRows = [
    { label: "Pass Count", key: "passCount" },
    { label: "Pass %", key: "passPercentage" },
    { label: "Fail Count", key: "failCount" },
    { label: "Unaccounted For", key: "unAccountedFor" },
  ];

  const getPassCountStyles = (count) => {
    if (count >= 70) {
      return { bg: "#E5FFE5", color: "#0B841D" };
    } else if (count >= 40) {
      return { bg: "#F79E1B33", color: "#F79E1B" };
    } else {
      return { bg: "#FEF1F1", color: "#EE383A" };
    }
  };
  
  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : filledGrid.length ? (
        <>
          <TableFormat
            alignIndices={[0, ...dateRange?.map((_, i) => i + 1)]}
            header={[
              "",
              ...dateRange?.map((date) =>
                new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              ),
            ]}
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
            {tableRows.map((audit, i) => (
              <Tr
                key={i}
                color="#707880"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td borderRight="1px solid #E2E5DC">{audit.label}</Td>
                {filledGrid.map((day, index) => {
                  const value = day[audit.key];

                  const isPassCountRow = audit.key === "passPercentage";
                  const styles = isPassCountRow
                    ? getPassCountStyles(value)
                    : {};

                  let displayValue = value;
                  if (audit.key === "passPercentage") {
                    displayValue = `${value}%`;
                  } else if (audit.key === "unAccountedFor") {
                    displayValue = `₦${Number(value)?.toLocaleString()}`;
                  }

                  return (
                    <Td key={index} bg={styles.bg} color={styles.color}>
                      {displayValue}
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
            No Location Sales Report
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default GridTable;
