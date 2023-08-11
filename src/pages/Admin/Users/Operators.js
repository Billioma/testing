import React, { useState } from "react";
import AttendantsTableLayer from "../../../components/data/Admin/Users/AttendantsTableLayer";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useGetAttendants } from "../../../services/admin/query/users";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";

export default function () {
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetAttendants(
    {
      refetchOnWindowFocus: true,
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
        <Text fontWeight="500">All Attendants</Text>
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
      </Flex>
      <hr />
      <AttendantsTableLayer
        data={data}
        isLoading={isLoading}
        page={page}
        limit={limit}
        setPage={setPage}
        startRow={startRow}
        endRow={endRow || 25}
      />
    </Box>
  );
}
