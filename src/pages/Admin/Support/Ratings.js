import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import RatingsTable from "../../../components/data/Admin/Feedbacks/RatingsTable";
import Filter from "../../../components/common/Filter";
import {
  feedbackOptions,
  ratingGrid,
  ratingType,
} from "../../../components/common/constants";
import { formatFilterDate } from "../../../utils/helpers";
import {
  useGetRatings,
  useGetRatingsMetric,
} from "../../../services/admin/query/feedback";

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

  const [type, setType] = useState("pay-to-park");

  const { data: ratingsMetric, isLoading: isMetric } = useGetRatingsMetric();
  const { data, isLoading, refetch } = useGetRatings(
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
    type,
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
    <Box>
      <Grid
        mb="24px"
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(4,1fr)",
        ]}
      >
        {ratingGrid?.map((dat, i) => (
          <GridItem key={i}>
            <Skeleton borderRadius="8px" isLoaded={!isMetric} h="10rem">
              <Box
                borderRadius="8px"
                bg="#F4F6F8"
                pt="5px"
                px="5px"
                border="1px solid #E4E6E8"
              >
                <Box h="6px" w="full" bg="#000" borderRadius="full"></Box>
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
                        {i === 0
                          ? ratingsMetric?.payToParkRating?.average
                          : i === 1
                          ? ratingsMetric?.eventParkingRating?.average
                          : i === 2
                          ? ratingsMetric?.reservationsRating?.average
                          : i === 3 &&
                            ratingsMetric?.serviceBookingsRating?.average}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Skeleton>
          </GridItem>
        ))}
      </Grid>

      <Flex w="full" mb="24px" bg="#F4F6F8" gap="24px" align="flex-end">
        {ratingType.map((item, i) => (
          <Flex
            px="32px"
            py="11px"
            fontSize="13px"
            fontWeight={500}
            cursor="pointer"
            _hover={{ color: "#EE383A" }}
            transition=".3s ease-in-out"
            justifyContent="center"
            color={type === item?.value ? "#444648" : "#949698"}
            align="center"
            key={i}
            borderBottom={type === item?.value ? "2px solid #EE383A" : "none"}
            onClick={() => {
              setType(item?.value);
              setPage(1);
              setLimit(25);
            }}
          >
            {item?.name}
          </Flex>
        ))}
      </Flex>

      <Box border="1px solid #d4d6d8" borderRadius="8px" p="16px 23px 24px">
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={feedbackOptions}
          title={
            <Text fontWeight={500} lineHeight="100%" color="#242628">
              All Ratings
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

        <RatingsTable
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
}
