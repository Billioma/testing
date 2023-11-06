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
import InvoiceTableLayer from "../../../components/data/Admin/Reports/InvoiceTableLayer";
import {
  adminInvoiceGrid,
  invoicesReportOptions,
} from "../../../components/common/constants";
import { useGetAdminReport } from "../../../services/admin/query/reports";
import InvoiceExport from "../../../components/data/Admin/Reports/InvoiceExport";
import Filter from "../../../components/common/Filter";

const Invoices = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const [filtArray, setFiltArray] = useState([]);

  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });

  const query = convertedFilters?.join("&");
  const { refetch, data, isLoading } = useGetAdminReport(
    "invoices",
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

  useEffect(() => {
    refetch();
  }, []);

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
        {adminInvoiceGrid?.map((dat, i) => (
          <GridItem key={i}>
            <Skeleton borderRadius="8px" isLoaded={!isLoading} h="10rem">
              <Box
                borderRadius="8px"
                bg="#F4F6F8"
                p="5px"
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
                <Box p="15px" pt="0px" pb="20px">
                  <Text
                    mt="24px"
                    fontSize="14px"
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
                        {i !== 0 && "₦"}{" "}
                        {i === 0
                          ? data?.total
                          : i === 1
                          ? data?.aggregate?.totalAmountPayable?.toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 2,
                              }
                            ) || "0.00"
                          : (i === 2 &&
                              data?.aggregate?.totalAmountPaid?.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 2,
                                }
                              )) ||
                            "0.00"}
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
          fieldToCompare={invoicesReportOptions}
          handleSearch={refetch}
          title={<Text fontWeight="500">All Invoices</Text>}
          main={
            <Flex align="center" gap="24px">
              <InvoiceExport data={data?.data} />
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

        <InvoiceTableLayer
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

export default Invoices;
