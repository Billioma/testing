import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetManagerGrid } from "../../../../services/admin/query/audit";
import { Box, Flex, Grid, GridItem, Skeleton, Text } from "@chakra-ui/react";
import { formatFilterDate } from "../../../../utils/helpers";
import GoBackTab from "../../../../components/data/Admin/GoBackTab";
import GridTable from "../../../../components/data/Admin/Audit/Manager/GridTable";

const ViewManager = () => {
  const { managerId } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      refetch();
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const managerName = sessionStorage.getItem("managerName");
  const start =
    sessionStorage.getItem("start") || yesterday.toISOString().split("T")[0];
  const end = sessionStorage.getItem("end") || `${formatFilterDate(start)}T23:59:59`;
  const { data, isLoading, refetch } = useGetManagerGrid(
    {
      refetchOnWindowFocus: true,
    },
    managerId,
    debouncedSearch,
    page,
    limit,
    start,
    end
  );

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
      <Box w="fit-content">
        <GoBackTab />
      </Box>
      <Text color="#3D3D3D" fontSize="20px" fontWeight={700}>
        {managerName}
      </Text>

      <Box mt="24px">
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
          {[
            "Manager's Rating",
            "Total Revenue Reported by Manager",
            "Total Recorded Transactions",
          ]?.map((dat, i) => (
            <GridItem key={i}>
              <Skeleton borderRadius="8px" isLoaded={!isLoading} h="10rem">
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
                          color={
                            i === 0
                              ? Number(data?.metrics?.managerRating) < 40
                                ? "#E81313"
                                : Number(data?.metrics?.managerRating < 70)
                                ? "#F9A11E"
                                : "#008000"
                              : "#646668"
                          }
                          fontWeight={500}
                        >
                          {" "}
                          {i === 1 ? "₦" : ""}{" "}
                          {i === 0
                            ? Number(
                                data?.metrics?.managerRating
                              )?.toLocaleString()
                            : i === 1
                            ? Number(
                                data?.metrics?.totalRevenueReported
                              )?.toLocaleString()
                            : i === 2 &&
                              data?.metrics?.totalTransactions?.toLocaleString()}
                          {i === 0 ? "%" : ""}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Skeleton>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Box border="1px solid #d4d6d8" borderRadius="8px" p="30px 23px 24px">
        <Text fontWeight={500} mb="15px" lineHeight="100%" color="#242628">
          {managerName} Locations
        </Text>

        <GridTable
          data={data}
          isLoading={isLoading}
          page={page}
          limit={limit}
          setPage={setPage}
          startRow={startRow}
          endRow={endRow}
          start={start}
          end={end}
          setLimit={setLimit}
        />
      </Box>
    </Box>
  );
};

export default ViewManager;
