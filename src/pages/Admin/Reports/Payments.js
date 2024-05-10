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
import PaymentTableLayer from "../../../components/data/Admin/Reports/PaymentTableLayer";
import {
  operatorPayGrid,
  paymentsOptions,
} from "../../../components/common/constants";
import {
  useGetReportExports,
  useGetReports,
} from "../../../services/admin/query/reports";
import PayExport from "../../../components/data/Admin/Reports/PayExport";
import Filter from "../../../components/common/Filter";
import { formatFilterDate } from "../../../utils/helpers";

const Payments = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
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
    "payments",
    page,
    limit,
    query
  );

  const createdAtFilters = convertedFilters.filter((filterString) => {
    return filterString.startsWith("filter=createdAt");
  });
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

  const {
    data: dataExports,
    isLoading: isExporting,
    mutate: exporMutate,
  } = useGetReportExports();

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
    <Box minH="75vh">
      <Grid
        mb="24px"
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        {operatorPayGrid?.map((dat, i) => (
          <GridItem key={i}>
            <Skeleton borderRadius="8px" isLoaded={!isLoading} h="10rem">
              <Box
                borderRadius="8px"
                bg="#F4F6F8"
                pt="5px"
                px="5px"
                border="1px solid #E4E6E8"
              >
                <Box
                  h="6px"
                  w="full"
                  bg={
                    i === 0
                      ? "#EE383A"
                      : i === 1
                      ? "#0B841D"
                      : i === 2 && "#242628"
                  }
                  borderRadius="full"
                ></Box>
                <Box px="15px" pt="0px" pb="20px">
                  <Text
                    mt="24px"
                    lineHeight="100%"
                    fontWeight={700}
                    color="#242628"
                  >
                    {dat}
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
                        {" "}
                        {i !== 2 && "₦"}{" "}
                        {i === 0
                          ? Number(
                              data?.aggregate?.totalAmountDue
                            )?.toLocaleString()
                          : i === 1
                          ? Number(
                              data?.aggregate?.totalAmountPaid
                            )?.toLocaleString()
                          : i === 2 && data?.total?.toLocaleString()}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={paymentsOptions}
          title={
            <Text fontWeight={500} lineHeight="100%" color="#242628">
              All Payments
            </Text>
          }
          gap
          main={
            <>
              {!isLoading ? (
                <PayExport
                  limit={data?.total}
                  action={() =>
                    exporMutate({ type: "payments", query: dateQuery })
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
        <PaymentTableLayer
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

export default Payments;
