import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetLocations } from "../../../../services/operator/query/locations";
import TableLayer from "../../../../components/data/Operator/Locations/Locations/TableLayer";
import Filter from "../../../../components/common/Filter";
import { opLocFieldOption } from "../../../../components/common/constants";

const Locations = () => {
  const { mutate, data, isLoading } = useGetLocations();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);

  const [filtArray, setFiltArray] = useState([]);
  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });
  const query = convertedFilters?.join("&");

  useEffect(() => {
    mutate({ filterString: query, limit, page: page });
  }, [page, query, limit]);

  const navigate = useNavigate();

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
              All Locations
            </Text>
          }
          main={
            <>
              <Button
                onClick={() => navigate("/operator/locations/all/create")}
                display="flex"
                gap="8px"
                fontSize=""
              >
                <Text fontSize="12px">Add a Location</Text>
                <MdAdd size="20px" />
              </Button>

              <Flex
                justifyContent="center"
                align="center"
                cursor="pointer"
                transition=".3s ease-in-out"
                _hover={{ bg: "#F4F6F8" }}
                onClick={() =>
                  mutate({ filterString: query, limit, page: page })
                }
                borderRadius="8px"
                border="1px solid #848688"
                p="10px"
              >
                <Image
                  src="/assets/refresh.svg"
                  className={isLoading && "mirrored-icon"}
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

export default Locations;
