import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useGetManagerSalesReports } from "../../../../services/admin/query/audit";
import ManagerTable from "../../../../components/data/Admin/Audit/Manager/ManagerTable";
import { formatFilterDate } from "../../../../utils/helpers";
import DatePicker from "react-multi-date-picker";
import { IoIosArrowForward } from "react-icons/io";
import CustomInput from "../../../../components/common/CustomInput";

const index = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const [values, setValues] = useState({
    gte: yesterday.toISOString().split("T")[0],
    lte: today.toISOString().split("T")[0],
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      refetch();
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, refetch } = useGetManagerSalesReports(
    {
      refetchOnWindowFocus: true,
    },
    debouncedSearch,
    page,
    limit,
    formatFilterDate(values.gte),
    formatFilterDate(values.lte)
  );

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    sessionStorage.removeItem("start");
    sessionStorage.removeItem("end");
    sessionStorage.removeItem("managerName");
  }, []);

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
  }, [data, page, limit, values.lte, values.gte]);

  return (
    <Box border="1px solid #d4d6d8" borderRadius="8px" p="16px 23px 24px">
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        align="center"
        justifyContent="space-between"
      >
        <Flex flexDir={{ base: "column", lg: "row" }} align="center" gap="32px">
          <Text color="#242628" fontSize="14px" fontWeight={500}>
            All Managers
          </Text>
          <Flex align="center" gap="10px">
            <Box className="ne_class" w={{ base: "100%", md: "113px" }}>
              <DatePicker
                placeholder="Select Date"
                value={values?.gte}
                onChange={(date) => {
                  setValues({ ...values, gte: date });
                  sessionStorage.setItem(
                    "start",
                    `${formatFilterDate(date)}T00:00:00`
                  );
                }}
              />
            </Box>

            <IoIosArrowForward />

            <Box className="ne_class" w={{ base: "100%", md: "113px" }}>
              <DatePicker
                placeholder="Select Date"
                value={values?.lte}
                onChange={(date) => {
                  setValues({ ...values, lte: date });
                  sessionStorage.setItem(
                    "end",
                    `${formatFilterDate(date)}T23:59:59`
                  );
                }}
              />
            </Box>
          </Flex>
        </Flex>

        <Box w={{ base: "", md: "15rem" }}>
          <CustomInput
            search
            holder="Search by name"
            auth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Flex>

      <ManagerTable
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
};

export default index;
