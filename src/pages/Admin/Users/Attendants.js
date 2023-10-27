import React, { useState, useEffect } from "react";
import AttendantsTableLayer from "../../../components/data/Admin/Users/AttendantsTableLayer";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useGetAttendants } from "../../../services/admin/query/users";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import Filter from "../../../components/common/Filter";
import { attendantsOptions } from "../../../components/common/constants";

export default function () {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);
  const navigate = useNavigate();
  const [filtArray, setFiltArray] = useState([]);

  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });

  const query = convertedFilters?.join("&");

  const { data, isLoading, refetch } = useGetAttendants(
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

  return (
    <Box w="full" border={"1px solid #E4E6E8"} borderRadius={"12px"}>
      <Filter
        setFiltArray={setFiltArray}
        filtArray={filtArray}
        fieldToCompare={attendantsOptions}
        handleSearch={refetch}
        title={<Text fontWeight="500">All Attendants</Text>}
        main={
          <Flex gap="6px">
            <Button
              variant="adminPrimary"
              gap={2}
              fontSize={"12px"}
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_ATTENDANT)}
            >
              Add an Attendant <FiPlus size={18} />
            </Button>
            <Button
              bg="white"
              py={3}
              h="43px"
              border="1px solid #000"
              color="#000"
              onClick={refetch}
            >
              <VscDebugRestart size={20} />
            </Button>
          </Flex>
        }
      />

      <hr />
      <AttendantsTableLayer
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
