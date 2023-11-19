import React, { useState, useEffect } from "react";
import MakesTableLayer from "../../../components/data/Admin/Config/MakesTableLayer";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useGetAdminVehicleMakes } from "../../../services/admin/query/configurations";
import Filter from "../../../components/common/Filter";
import { makesOptions } from "../../../components/common/constants";
import { MdAdd } from "react-icons/md";

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

  const { mutate, data, isLoading } = useGetAdminVehicleMakes();

  useEffect(() => {
    mutate({ filterString: query, limit, page: page });
  }, [page, query, limit]);

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
        fieldToCompare={makesOptions}
        handleSearch={() =>
          mutate({ filterString: query, limit: limit, page: page })
        }
        title={
          <Text
            fontSize="14px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            All Vehicle Makes
          </Text>
        }
        gap
        main={
          <>
            <Button
              onClick={() =>
                navigate(PRIVATE_PATHS.ADMIN_CONFIG_ADD_VEHICLE_MAKE)
              }
              display="flex"
              bg="#000"
              gap="8px"
            >
              <Text fontSize="12px">Add Make</Text>
              <MdAdd size="20px" />
            </Button>
            <Flex
              justifyContent="center"
              align="center"
              cursor="pointer"
              transition=".3s ease-in-out"
              _hover={{ bg: "#F4F6F8" }}
              onClick={() => mutate({ filterString: query, limit, page: page })}
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

      <MakesTableLayer
        data={data}
        isLoading={isLoading}
        page={page}
        limit={limit}
        setPage={setPage}
        startRow={startRow}
        endRow={endRow || 25}
        refetch={() => mutate({ filterString: query, limit, page: page })}
        setLimit={setLimit}
      />
    </Box>
  );
}
