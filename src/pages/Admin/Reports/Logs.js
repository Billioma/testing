import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import LogsTableLayer from "../../../components/data/Admin/Reports/LogsTableLayer";
import LogsExport from "../../../components/data/Admin/Reports/LogsExport";
import { useGetAdminReport } from "../../../services/admin/query/reports";
import Filter from "../../../components/common/Filter";
import { logsReportOptions } from "../../../components/common/constants";

const Logs = () => {
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
  const { refetch, data, isLoading } = useGetAdminReport(
    "parking",
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
      <Grid mb="24px" templateColumns={"repeat(3,1fr)"}>
        <GridItem>
          <Skeleton borderRadius="8px" isLoaded={!isLoading}>
            <Box
              borderRadius="8px"
              bg="#F4F6F8"
              p="5px"
              border="1px solid #E4E6E8"
            >
              <Box h="6px" w="full" bg="#EE383A" borderRadius="full"></Box>
              <Box p="15px" pt="0px" pb="20px">
                <Text
                  mt="24px"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={700}
                  color="#242628"
                >
                  Total Logs
                </Text>

                <Flex
                  mt="24px"
                  align="flex-end"
                  justifyContent="space-between"
                  w="full"
                >
                  <Box w="full">
                    <Text
                      mt="24px"
                      fontSize="28px"
                      lineHeight="100%"
                      color="#646668"
                      fontWeight={500}
                    >
                      {data?.total?.toLocaleString()}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Skeleton>
        </GridItem>
      </Grid>

      <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={logsReportOptions}
          handleSearch={refetch}
          title={<Text fontWeight="500">All Logs</Text>}
          main={
            <Flex align="center" gap="24px">
              <LogsExport data={data?.data} />
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

        <LogsTableLayer
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

export default Logs;
