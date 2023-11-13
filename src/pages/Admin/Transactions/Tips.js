import React, { useState, useEffect } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import TableLayer from "../../../components/data/Admin/Transactions/TipsTableLayer";
import { useGetAdminTipsList } from "../../../services/admin/query/transactions";
import { tipsOptions } from "../../../components/common/constants";
import Filter from "../../../components/common/Filter";

export default function () {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);
  const [filtArray, setFiltArray] = useState([]);

  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });

  const query = convertedFilters?.join("&");

  const { mutate, data, isLoading } = useGetAdminTipsList();

  useEffect(() => {
    mutate({ filterString: query, limit, page: page });
  }, [page, query, limit]);

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
    <Box border="1px solid #d4d6d8" borderRadius="8px" p="16px 23px 24px">
      <Filter
        setFiltArray={setFiltArray}
        filtArray={filtArray}
        fieldToCompare={tipsOptions}
        handleSearch={() =>
          mutate({ filterString: query, limit: limit, page: page })
        }
        title={
          <Text
            fontSize="14px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            All Tips
          </Text>
        }
        gap
        main={
          <>
            <Flex
              justifyContent="center"
              align="center"
              cursor="pointer"
              transition=".3s ease-in-out"
              _hover={{ bg: "#F4F6F8" }}
              onClick={() => mutate({ filterString: query, limit, page: page })}
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
          </>
        }
      />

      <TableLayer
        data={data}
        isLoading={isLoading}
        page={page}
        limit={limit}
        setPage={setPage}
        startRow={startRow}
        endRow={endRow}
        refetch={() => mutate({ filterString: query, limit, page: page })}
        setLimit={setLimit}
      />
    </Box>
  );
}
