import React, { useState } from "react";
import ServicedVehiclesTableLayer from "../../../components/data/Admin/Logs/ServicedVehiclesTableLayer";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { VscDebugRestart } from "react-icons/vsc";
import { useGetParkedVehicles } from "../../../services/admin/query/logs";

export default function () {
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);

  const { data, isLoading, refetch } = useGetParkedVehicles(
    {
      refetchOnWindowFocus: true,
      onSuccess: (data) => {
        const nextStartRow = endRow + 1;
        const nextEndRow = Math.min(endRow + limit, data?.total);

        setStartRow(nextStartRow);
        setEndRow(nextEndRow);
      },
    },
    page,
    limit
  );

  return (
    <Box w="full" border={"1px solid #E4E6E8"} borderRadius={"12px"}>
      <Flex justifyContent={"space-between"} alignItems="center" py={3} px={5}>
        <Text fontWeight="500">All Serviced Vehicles</Text>
        <Flex gap="6px">
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
      <ServicedVehiclesTableLayer
        data={data}
        isLoading={isLoading}
        page={page}
        limit={limit}
        setPage={setPage}
        startRow={startRow}
        endRow={endRow || 25}
        refetch={refetch}
      />
    </Box>
  );
}
