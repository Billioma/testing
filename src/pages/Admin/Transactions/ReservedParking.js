import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import TableLayer from "../../../components/data/Admin/Transactions/ReservedParkingTableLayer";
import { useGetReservedParking } from "../../../services/admin/query/transactions";

export default function () {
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetReservedParking(
    {
      onSuccess: (data) => {
        const nextStartRow = endRow + 1;
        const nextEndRow = Math.min(endRow + limit, data?.total);

        // Update the state with the new row numbers
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
        <Text fontWeight="500">Reserved Parking</Text>
        <Flex gap="6px">
          {/* <Button
            variant="adminPrimary"
            gap={2}
            fontSize={"12px"}
            onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_RESERVED_PARKING)}
          >
            Add a Transaction <FiPlus size={18} />
          </Button> */}
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
      </Flex>
      <hr />
      <TableLayer
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
