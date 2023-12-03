import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useGetOpLocationUrl } from "../../../../services/operator/query/locations";
import TableLayer from "../../../../components/data/Operator/Locations/Rates/TableLayer";
import Filter from "../../../../components/common/Filter";
import { opLocFieldOption } from "../../../../components/common/constants";
import { formatDate } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";

const Rates = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);

  const [filtArray, setFiltArray] = useState([]);
  const convertedFilters = filtArray?.map((filterObj) => {
    return filterObj?.gte
      ? `filter=${filterObj?.title}||gte||"${formatDate(filterObj?.gte)}"`
      : filterObj?.lte
      ? `filter=${filterObj?.title}||lte||"${formatDate(filterObj?.lte)}"`
      : `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
          filterObj?.filter
        }"`;
  });

  const query = convertedFilters?.join("&");

  const [isRefetch, setIsRefetch] = useState(false);

  const { data, isLoading, refetch } = useGetOpLocationUrl(
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
    "rates",
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
    sessionStorage.removeItem("edit");
  }, []);

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

  const navigate = useNavigate();

  return (
    <Box minH="75vh">
      <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
        <Filter
          gap
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={opLocFieldOption}
          title={
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
              All Rates
            </Text>
          }
          main={
            <>
              <Button
                onClick={() => navigate("/operator/locations/rates/create")}
                display="flex"
                gap="8px"
                fontSize=""
              >
                <Text fontSize="12px">Add a Rate</Text>
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

        <TableLayer
          data={data}
          isLoading={isLoading}
          page={page}
          limit={limit}
          setPage={setPage}
          startRow={startRow}
          endRow={endRow}
          setLimit={setLimit}
        />
      </Box>
    </Box>
  );
};

export default Rates;
