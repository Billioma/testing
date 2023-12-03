import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import HistoryTableLayer from "../../../components/data/Admin/Reports/HistoryTableLayer";
import { useGetTran } from "../../../services/admin/query/reports";
import HistoryExport from "../../../components/data/Admin/Reports/HistoryExport";
import Filter from "../../../components/common/Filter";
import { paymentHistoryReportOptions } from "../../../components/common/constants";
import { formatDate } from "../../../utils/helpers";

const History = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(50);
  const [filtArray, setFiltArray] = useState([]);

  const convertedFilters = filtArray?.map((filterObj) => {
    return filterObj?.gte
      ? `filter=${filterObj?.title}||gte||"${formatDate(filterObj?.gte)}"`
      : filterObj?.lte
      ? `filter=${filterObj?.title}||lte||"${formatDate(filterObj?.lte)}"`
      : `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
          filterObj?.filter
        }"`;
  });

  const query = convertedFilters?.join("&");
  const [isRefetch, setIsRefetch] = useState(false);
  const { data, isLoading, refetch } = useGetTran(
    {
      refetchOnWindowFocus: true,
      onSuccess: () => {
        setIsRefetch(false);
      },
      onError: () => {
        setIsRefetch(false);
      },
      onSettled: () => {
        setIsRefetch(false);
      },
    },
    page,
    limit,
    query
  );

  useEffect(() => {
    refetch();
  }, []);

  const handleRefreshClick = async () => {
    setIsRefetch(true);
    await refetch();
  };

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = data?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit]);

  return (
    <>
      <Box border="1px solid #d4d6d8" borderRadius="8px" p="16px 23px 24px">
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={paymentHistoryReportOptions}
          title={
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
              All Payment History
            </Text>
          }
          gap
          main={
            <>
              {" "}
              {data?.data?.length ? <HistoryExport data={data?.data} /> : ""}
              <Flex
                justifyContent="center"
                align="center"
                cursor="pointer"
                transition=".3s ease-in-out"
                _hover={{ bg: "#F4F6F8" }}
                onClick={handleRefreshClick}
                borderRadius="8px"
                border="1px solid #848688"
                p="10px"
              >
                <Image
                  src="/assets/refresh.svg"
                  className={isRefetch && "mirrored-icon"}
                  w="20px"
                  h="20px"
                />
              </Flex>
            </>
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
          setLimit={setLimit}
        />
      </Box>
    </>
  );
};

export default History;
