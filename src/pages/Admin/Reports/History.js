import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import HistoryTableLayer from "../../../components/data/Admin/Reports/HistoryTableLayer";
import { useGetAdminTran } from "../../../services/admin/query/reports";
import HistoryExport from "../../../components/data/Admin/Reports/HistoryExport";
import Filter from "../../../components/common/Filter";
import { paymentHistoryReportOptions } from "../../../components/common/constants";

const History = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(50);
  const [filtArray, setFiltArray] = useState([]);

  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });

  const query = convertedFilters?.join("&");
  const { refetch, data, isLoading } = useGetAdminTran(
    {
      refetchOnWindowFocus: true,
    },
    page,
    limit,
    query
  );

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = data.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit]);

  return (
    <Box minH="75vh">
      <Box
        mt="24px"
        borderRadius="8px"
        border="1px solid #d4d6d8"
        p="16px 23px 24px"
      >
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={paymentHistoryReportOptions}
          handleSearch={refetch}
          title={<Text fontWeight="500">All Payment History</Text>}
          main={
            <Flex align="center" gap="24px">
              <HistoryExport data={data?.data} />
              <Flex
                justifyContent="center"
                align="center"
                cursor="pointer"
                transition=".3s ease-in-out"
                _hover={{ bg: "#F4F6F8" }}
                onClick={refetch}
                borderRadius="8px"
                border="1px solid #848688"
                p="10px"
              >
                <Image
                  src="/assets/refresh.svg"
                  className={isLoading && "mirrored-icon"}
                  w="20px"
                  h="20px"
                />
              </Flex>
            </Flex>
          }
        />

        <HistoryTableLayer
          data={data}
          isLoading={isLoading}
          page={page}
          limit={limit}
          setPage={setPage}
          startRow={startRow}
          endRow={endRow}
          refetch={refetch}
          setLimit={setLimit}
        />
      </Box>
    </Box>
  );
};

export default History;
