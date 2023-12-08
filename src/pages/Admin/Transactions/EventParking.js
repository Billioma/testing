import React, { useState, useEffect } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import TableLayer from "../../../components/data/Admin/Transactions/EventParkignTableLayer";
import { useGetEventParking } from "../../../services/admin/query/transactions";
import { eventParkingOptions } from "../../../components/common/constants";
import Filter from "../../../components/common/Filter";
import { formatFilterDate } from "../../../utils/helpers";

export default function () {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);
  const [filtArray, setFiltArray] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const convertedFilters = filtArray?.map((filterObj) => {
    return filterObj?.gte
      ? `filter=${filterObj?.title}||$gte||"${formatFilterDate(
          filterObj?.gte
        )}T00:00:00"`
      : filterObj?.lte
      ? `filter=${filterObj?.title}||$lte||"${formatFilterDate(
          filterObj?.lte
        )}T23:59:59"`
      : `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
          filterObj?.filter
        }"`;
  });

  const query =
    filtArray?.length === 0
      ? `filter=createdAt||$gte||${year}-01-01T00:00:00&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length > 0 &&
        filtArray?.filter((item) => item?.lte)?.length === 0
      ? `${convertedFilters?.join(
          "&"
        )}&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length === 0 &&
        filtArray?.filter((item) => item?.lte)?.length === 0
      ? `${convertedFilters?.join(
          "&"
        )}&filter=createdAt||$gte||${year}-01-01T00:00:00&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length === 0 &&
        filtArray?.filter((item) => item?.lte)?.length > 0
      ? `${convertedFilters?.join("&")}`
      : filtArray?.filter((item) => item?.gte)?.length &&
        filtArray?.filter((item) => item?.lte)?.length
      ? `${convertedFilters?.join("&")}`
      : convertedFilters?.join("&");

  const [isRefetch, setIsRefetch] = useState(false);

  const { data, isLoading, refetch } = useGetEventParking(
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
    <Box border="1px solid #d4d6d8" borderRadius="8px" p="16px 23px 24px">
      <Filter
        setFiltArray={setFiltArray}
        filtArray={filtArray}
        fieldToCompare={eventParkingOptions}
        title={
          <Text fontWeight={500} lineHeight="100%" color="#242628">
            Event Parking
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

      <TableLayer
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
  );
}
