import React, { useState, useEffect } from "react";
import PoliciesTableLayer from "../../../components/data/Admin/Locations/PoliciesTableLayer";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useGetPolicies } from "../../../services/admin/query/locations";
import Filter from "../../../components/common/Filter";
import { policiesOptions } from "../../../components/common/constants";
import { MdAdd } from "react-icons/md";
import { formatFilterDate } from "../../../utils/helpers";

export default function () {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const navigate = useNavigate();
  const [filtArray, setFiltArray] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const convertedFilters = filtArray?.map((filterObj) => {
    return filterObj?.gte
      ? `filter=${filterObj?.title}||$gte||"${formatFilterDate(
          filterObj?.gte
        )}T00:00:00"`
      : filterObj?.lte
      ? `filter=${filterObj?.title}||$lte||"${formatFilterDate(
          filterObj?.lte
        )}T23:59:59"`
      : `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
          filterObj?.filter
        }"`;
  });

  const query =
    filtArray?.length === 0
      ? `filter=createdAt||$gte||${year}-01-01T00:00:00&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length > 0 &&
        filtArray?.filter((item) => item?.lte)?.length === 0
      ? `${convertedFilters?.join(
          "&"
        )}&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length === 0 &&
        filtArray?.filter((item) => item?.lte)?.length === 0
      ? `${convertedFilters?.join(
          "&"
        )}&filter=createdAt||$gte||${year}-01-01T00:00:00&filter=createdAt||$lte||${year}-12-31T23:59:59`
      : filtArray?.filter((item) => item?.gte)?.length === 0 &&
        filtArray?.filter((item) => item?.lte)?.length > 0
      ? `${convertedFilters?.join("&")}`
      : filtArray?.filter((item) => item?.gte)?.length &&
        filtArray?.filter((item) => item?.lte)?.length
      ? `${convertedFilters?.join("&")}`
      : convertedFilters?.join("&");

  const [isRefetch, setIsRefetch] = useState(false);

  const { data, isLoading, refetch } = useGetPolicies(
    {
      refetchOnWindowFocus: true,
      onSuccess: () => {
        setIsRefetch(false);
      },
      onError: () => {
        setIsRefetch(false);
      },
      onSettled: () => {
        setIsRefetch(false);
      },
    },
    page,
    limit,
    query
  );

  useEffect(() => {
    refetch();
  }, []);

  const handleRefreshClick = async () => {
    setIsRefetch(true);
    await refetch();
  };
  useEffect(() => {
    setPage(1);
  }, [limit]);

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
  }, [data, page, limit]);

  return (
    <Box border="1px solid #d4d6d8" borderRadius="8px" p="16px 23px 24px">
      <Filter
        setFiltArray={setFiltArray}
        filtArray={filtArray}
        fieldToCompare={policiesOptions}
        title={
          <Text fontWeight={500} lineHeight="100%" color="#242628">
            All Policies
          </Text>
        }
        gap
        main={
          <>
            <Button
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_POLICY)}
              display="flex"
              bg="#000"
              gap="8px"
            >
              <Text fontSize="14px">Add a Policy</Text>
              <MdAdd size="20px" />
            </Button>
            <Flex
              justifyContent="center"
              align="center"
              cursor="pointer"
              transition=".3s ease-in-out"
              _hover={{ bg: "#F4F6F8" }}
              onClick={handleRefreshClick}
              borderRadius="8px"
              border="1px solid #848688"
              p="10px"
            >
              <Image
                src="/assets/refresh.svg"
                className={isRefetch && "mirrored-icon"}
                w="20px"
                h="20px"
              />
            </Flex>
          </>
        }
      />

      <PoliciesTableLayer
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
