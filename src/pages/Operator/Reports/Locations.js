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
import LocationTableLayer from "../../../components/data/Operator/Reports/LocationTableLayer";
import { useGetRepLocation } from "../../../services/operator/query/reports";
import LocationExport from "../../../components/data/Operator/Reports/LocationExport";
import Filter from "../../../components/common/Filter";
import { opRepLocFieldOption } from "../../../components/common/constants";

const Locations = () => {
  const { mutate, data, isLoading } = useGetRepLocation();

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
                  Total locations
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
                      {data?.total}
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
          gap
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={opRepLocFieldOption}
          title={
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
              All Locations
            </Text>
          }
          main={
            <>
              {data?.data?.length ? <LocationExport data={data?.data} /> : ""}
              <Flex
                justifyContent="center"
                align="center"
                cursor="pointer"
                transition=".3s ease-in-out"
                _hover={{ bg: "#F4F6F8" }}
                onClick={() =>
                  mutate({ filterString: query, limit, page: page })
                }
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

        <LocationTableLayer
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

export default Locations;
