import React, { useState, useEffect } from "react";
import ModelsTableLayer from "../../../components/data/Admin/Config/ModelsTableLayer";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useGetModels } from "../../../services/admin/query/configurations";
import Filter from "../../../components/common/Filter";
import { modelsOptions } from "../../../components/common/constants";

export default function () {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const navigate = useNavigate();
  const [filtArray, setFiltArray] = useState([]);

  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });

  const query = convertedFilters?.join("&");

  const { data, isLoading, refetch } = useGetModels(
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
        fieldToCompare={modelsOptions}
        handleSearch={refetch}
        title={<Text fontWeight="500">All Vehicle Models</Text>}
        main={
          <Flex gap="6px">
            <Button
              variant="adminPrimary"
              gap={2}
              fontSize={"12px"}
              onClick={() =>
                navigate(PRIVATE_PATHS.ADMIN_CONFIG_ADD_VEHICLE_MODEL)
              }
            >
              <Text display={{ base: "none", md: "inline-flex" }}>
                Add model
              </Text>
              <FiPlus size={18} />
            </Button>
            <Button
              bg="white"
              py={3}
              h="43px"
              border="1px solid #000"
              color="#000"
              onClick={() => refetch()}
            >
              <VscDebugRestart size={20} />
            </Button>
          </Flex>
        }
      />
      <hr />
      <ModelsTableLayer
        data={data}
        isLoading={isLoading}
        page={page}
        limit={limit}
        setPage={setPage}
        startRow={startRow}
        endRow={endRow || 25}
        refetch={refetch}
        setLimit={setLimit}
      />
    </Box>
  );
}
