import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import TableLayer from "../../../components/data/Admin/Memberships/MembershipFeaturesTableLayer";
import { useGetMembershipFeatures } from "../../../services/admin/query/memberships";
import Filter from "../../../components/common/Filter";
import { membershipFeaturesOptions } from "../../../components/common/constants";

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

  const { data, isLoading, refetch } = useGetMembershipFeatures(
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
        fieldToCompare={membershipFeaturesOptions}
        handleSearch={refetch}
        title={<Text fontWeight="500">All Membership Features</Text>}
        main={
          <Flex gap="6px">
            <Button
              variant="adminPrimary"
              gap={2}
              fontSize={"12px"}
              onClick={() =>
                navigate(PRIVATE_PATHS.ADMIN_ADD_MEMBERSHIP_FEATURE)
              }
            >
              Add a Feature <FiPlus size={18} />
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
      <TableLayer
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
