import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSalesReportsLocationGrid,
  useGetSalesReportsLocationTrans,
} from "../../../../services/admin/query/audit";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import GoBackTab from "../../../../components/data/Admin/GoBackTab";
import {
  formatDates,
  getEndOfWeek,
  getStartWeek,
} from "../../../../utils/helpers";
import StartnEnd from "../../../../components/modals/StartnEnd";
import { IoIosArrowForward } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { PiGridNine, PiTableLight } from "react-icons/pi";
import Table from "../../../../components/data/Admin/Audit/Locations/Table";
import GridTable from "../../../../components/data/Admin/Audit/Locations/GridTable";
import { AuditStatus } from "../../../../components/common/constants";

const ViewLocation = () => {
  const [showEndDate, setShowEndDate] = useState(false);
  const [tab, setTab] = useState("Table");
  const [startValue, startChange] = useState(getStartWeek(new Date()));
  const [endValue, endChange] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const { id, managerId } = useParams();

  useEffect(() => {
    const now = new Date();
    const startOfWeek = getStartWeek(now);
    const endOfWeek = getEndOfWeek(now);

    startChange(formatDates(startOfWeek));
    endChange(formatDates(endOfWeek));
  }, []);

  const {
    isOpen: isDateOpen,
    onClose: onDateClose,
    onOpen: onDateOpen,
  } = useDisclosure();

  const { data, isLoading, refetch } = useGetSalesReportsLocationGrid(
    id,
    {
      refetchOnWindowFocus: true,
    },
    managerId,
    page,
    limit,
    formatDates(startValue),
    formatDates(endValue)
  );

  const {
    data: trans,
    isLoading: isTrans,
    refetch: refetchTrans,
  } = useGetSalesReportsLocationTrans(
    id,
    {
      refetchOnWindowFocus: true,
    },
    managerId,
    page,
    limit,
    formatDates(startValue),
    formatDates(endValue)
  );
  const dataToCheck = tab === "Table" ? trans : data;

  useEffect(() => {
    if (tab === "Table" ? !trans?.data : !data?.grid) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = dataToCheck?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit, trans, tab]);

  const handleCloseDate = () => {
    onDateClose();
    refetch();
    refetchTrans();
  };

  const audit_status = sessionStorage.getItem("audit_status");
  return (
    <Box>
      <StartnEnd
        startValue={startValue}
        startChange={startChange}
        endValue={endValue}
        endChange={endChange}
        showStartDate={showStartDate}
        setShowStartDate={setShowStartDate}
        showEndDate={showEndDate}
        setShowEndDate={setShowEndDate}
        isOpen={isDateOpen}
        onClose={handleCloseDate}
      />
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

        <Flex align="center" gap="4px" color="#444648" fontSize="12px">
          <Flex
            onClick={onDateOpen}
            bg="#F4F6F8"
            cursor="pointer"
            p="12px 16px"
            gap="10px"
            borderRadius="8px"
          >
            <FaCalendarAlt />
            {formatDates(startValue)}
          </Flex>

          <IoIosArrowForward size="20px" />

          <Flex
            bg="#F4F6F8"
            onClick={onDateOpen}
            cursor="pointer"
            p="12px 16px"
            gap="10px"
            borderRadius="8px"
          >
            <FaCalendarAlt />
            {formatDates(endValue)}
          </Flex>
        </Flex>
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

      <Flex display="none" mb="24px" bg="#F4F6F8" align="center" gap="28px">
        {["Table", "Grid"].map((item, i) => (
          <Flex
            align="center"
            p="8px 16px"
            gap="8px"
            cursor="pointer"
            _hover={{ color: "#444648" }}
            transition=".3s ease-in-out"
            onClick={() => {
              setTab(item);
              setLimit(25);
              setEndRow(0);
              setStartRow(1);
              setPage(1);
            }}
            borderBottom={tab === item ? "2px solid #444648" : "none"}
            color={tab === item ? "#444648" : "#949698"}
          >
            {i === 0 ? <PiTableLight /> : <PiGridNine />}
            <Text fontSize="12px" fontWeight={500}>
              {item}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Box border="1px solid #d4d6d8" borderRadius="8px" p="30px 23px 24px">
        <Text fontWeight={500} mb="15px" lineHeight="100%" color="#242628">
          Transaction History
        </Text>
        {tab === "Table" ? (
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
        ) : (
          <GridTable
            data={data}
            isLoading={isLoading}
            page={page}
            limit={limit}
            setPage={setPage}
            startRow={startRow}
            endRow={endRow}
            start={formatDates(startValue)}
            end={formatDates(endValue)}
            setLimit={setLimit}
          />
        )}
      </Box>
    </Box>
  );
};

export default ViewLocation;
