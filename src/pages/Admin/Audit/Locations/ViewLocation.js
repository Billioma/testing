import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSalesReportsLocationGrid,
  useGetSalesReportsLocationTrans,
} from "../../../../services/admin/query/audit";
import { Box, Flex, Grid, GridItem, Skeleton, Text } from "@chakra-ui/react";
import GoBackTab from "../../../../components/data/Admin/GoBackTab";
import Table from "../../../../components/data/Admin/Audit/Locations/Table";
import { AuditStatus } from "../../../../components/common/constants";
import { formatFilterDate } from "../../../../utils/helpers";

const ViewLocation = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const { id, managerId } = useParams();

  const start =
    sessionStorage.getItem("loc_start") ||
    yesterday.toISOString().split("T")[0];
  const end =
    sessionStorage.getItem("loc_end") || `${formatFilterDate(start)}T23:59:59`;
  const { data, isLoading } = useGetSalesReportsLocationGrid(
    id,
    {
      refetchOnWindowFocus: true,
    },
    managerId,
    page,
    limit,
    start,
    end
  );

  const { data: trans, isLoading: isTrans } = useGetSalesReportsLocationTrans(
    id,
    {
      refetchOnWindowFocus: true,
    },
    managerId,
    page,
    limit,
    start,
    end
  );

  useEffect(() => {
    if (!trans?.data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = trans?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit, trans]);

  const audit_status = sessionStorage.getItem("audit_status");
  return (
    <Box>
      <Box w="fit-content">
        <GoBackTab />
      </Box>

      <Flex align="flex-end" justifyContent="space-between">
        <Box>
          <Text color="#3D3D3D" fontSize="20px" fontWeight={700}>
            {data?.metrics?.location?.name}
          </Text>
          <Box
            bg="#F4F6F8"
            mt="8px"
            borderRadius="4px"
            color="#949698"
            p="6px"
            textAlign="center"
            w="fit-content"
            fontWeight={500}
            fontSize="12px"
          >
            Manager:{" "}
            <span style={{ color: "#3D3D3D" }}>
              {data?.metrics?.manager?.firstName}{" "}
              {data?.metrics?.manager?.lastName}
            </span>
          </Box>
        </Box>
      </Flex>

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
            "Total Revenue Reported by Manager",
            "Total Revenue Recorded by System",
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
                          color="#646668"
                          fontWeight={500}
                        >
                          {" "}
                          {i !== 2 && "₦"}{" "}
                          {i === 0
                            ? Number(
                                data?.metrics?.totalRevenueReported
                              )?.toLocaleString()
                            : i === 1
                            ? Number(
                                data?.metrics?.totalRevenueRecordedBySystem
                              )?.toLocaleString()
                            : i === 2 &&
                              data?.metrics?.totalTransactions?.toLocaleString()}
                        </Text>
                      </Box>

                      <Flex
                        align="center"
                        w="full"
                        display={i === 0 ? "flex" : "none"}
                        fontSize="14px"
                        justifyContent="flex-end"
                      >
                        <Flex
                          color={
                            AuditStatus.find(
                              (dat) =>
                                dat.name?.toLowerCase() ===
                                audit_status?.toLowerCase()
                            )?.color || ""
                          }
                          bg={
                            AuditStatus.find(
                              (dat) =>
                                dat.name?.toLowerCase() ===
                                audit_status?.toLowerCase()
                            )?.bg || ""
                          }
                          justifyContent="center"
                          align="center"
                          fontWeight={500}
                          py="5px"
                          textTransform="capitalize"
                          px="16px"
                          borderRadius="4px"
                        >
                          {audit_status?.toLowerCase()}
                        </Flex>
                      </Flex>
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
          Transaction History
        </Text>

        <Table
          data={trans}
          isLoading={isTrans}
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

export default ViewLocation;
