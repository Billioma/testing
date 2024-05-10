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
import CustomerTableLayer from "../../../components/data/Admin/Reports/CustomerTableLayer";
import {
  useGetReportExports,
  useGetReports,
} from "../../../services/admin/query/reports";
import CustomerExport from "../../../components/data/Admin/Reports/CustomerExport";
import Filter from "../../../components/common/Filter";
import { customersReportOptions } from "../../../components/common/constants";
import { formatFilterDate } from "../../../utils/helpers";

const Customers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(50);
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
  const createdAtFilters = convertedFilters.filter((filterString) => {
    return filterString.startsWith("filter=createdAt");
  });

  const query =
    filtArray?.length === 0
      ? `filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length > 0 &&
        filtArray?.filter((item) => item?.lte)?.length === 0
      ? `${convertedFilters?.join(
          "&"
        )}&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length === 0 &&
        filtArray?.filter((item) => item?.lte)?.length === 0
      ? `${convertedFilters?.join(
          "&"
        )}&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length === 0 &&
        filtArray?.filter((item) => item?.lte)?.length > 0
      ? `${convertedFilters?.join("&")}`
      : filtArray?.filter((item) => item?.gte)?.length &&
        filtArray?.filter((item) => item?.lte)?.length
      ? `${convertedFilters?.join("&")}`
      : convertedFilters?.join("&");

  const dateQuery =
    filtArray?.length === 0
      ? `filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length > 0 &&
        filtArray?.filter((item) => item?.lte)?.length === 0
      ? `${createdAtFilters?.join(
          "&"
        )}&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length === 0 &&
        filtArray?.filter((item) => item?.lte)?.length === 0
      ? `${createdAtFilters?.join(
          "&"
        )}&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length === 0 &&
        filtArray?.filter((item) => item?.lte)?.length > 0
      ? `${createdAtFilters?.join("&")}`
      : filtArray?.filter((item) => item?.gte)?.length &&
        filtArray?.filter((item) => item?.lte)?.length
      ? `${createdAtFilters?.join("&")}`
      : createdAtFilters?.join("&");

  const [isRefetch, setIsRefetch] = useState(false);
  const { data, isLoading, refetch } = useGetReports(
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
    "customers",
    page,
    limit,
    query
  );

  const {
    data: dataExports,
    isLoading: isExporting,
    mutate: exporMutate,
  } = useGetReportExports();

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
    <Box minH="75vh">
      <Grid mb="24px" templateColumns={"repeat(3,1fr)"}>
        <GridItem>
          <Skeleton borderRadius="8px" isLoaded={!isLoading}>
            <Box
              borderRadius="8px"
              bg="#F4F6F8"
              pt="5px"
              px="5px"
              border="1px solid #E4E6E8"
            >
              <Box h="6px" w="full" bg="#EE383A" borderRadius="full"></Box>
              <Box p="15px" pt="0px" pb="20px">
                <Text
                  mt="24px"
                  lineHeight="100%"
                  fontWeight={700}
                  color="#242628"
                >
                  Total Customers
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
                      {data?.total || 0}
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
          fieldToCompare={customersReportOptions}
          title={
            <Text mt="24px" lineHeight="100%" fontWeight={700} color="#242628">
              All Customers
            </Text>
          }
          gap
          main={
            <>
              {!isLoading ? (
                <CustomerExport
                  limit={data?.total}
                  action={() =>
                    exporMutate({ type: "customers", query: dateQuery })
                  }
                  isExporting={isExporting}
                  data={dataExports}
                />
              ) : (
                ""
              )}

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

        <CustomerTableLayer
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
    </Box>
  );
};

export default Customers;
