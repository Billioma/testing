import React, { useState, useEffect } from "react";
import ClientsTableLayer from "../../../components/data/Admin/Clients/ClientsListsTableLayer";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useGetClients } from "../../../services/admin/query/clients";

export default function () {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetClients(
    {
      refetchOnWindowFocus: true,
    },
    page,
    limit
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
      <Flex justifyContent={"space-between"} alignItems="center" py={3} px={5}>
        <Text fontWeight="500">All Clients</Text>
        <Flex gap="6px">
          <Button
            variant="adminPrimary"
            gap={2}
            fontSize={"12px"}
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_CLIENT)}
          >
            <Text display={{ base: "none", md: "inline-flex" }}>
              Add a Client
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
      </Flex>
      <hr />
      <ClientsTableLayer
        data={data}
        isLoading={isLoading}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        startRow={startRow}
        endRow={endRow}
        refetch={refetch}
      />
    </Box>
  );
}
