import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ServicedTableLayer from "../../../../components/data/Operator/Logs/ServicedTableLayer";
import { useGetServiced } from "../../../../services/operator/query/logs";
import Filter from "../../../../components/common/Filter";
import { opLogServiceFieldOption } from "../../../../components/common/constants";

const Vehicles = () => {
  const { mutate, data, isLoading } = useGetServiced();

  const [page, setPage] = useState(1);
  const limit = 10;

  const [filtArray, setFiltArray] = useState([]);
  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });
  const query = convertedFilters?.join("&");

  useEffect(() => {
    mutate({ filterString: query, limit, page: page });
  }, [page, query]);

  return (
    <Box minH="75vh">
      <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
        <Filter
          gap
          setFiltArray={setFiltArray}
          handleSearch={() =>
            mutate({ filterString: query, limit: limit, page: page })
          }
          filtArray={filtArray}
          fieldToCompare={opLogServiceFieldOption}
          title={
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
              All Serviced Vehicles
            </Text>
          }
          main={
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
          }
        />

        <ServicedTableLayer
          page={page}
          setPage={setPage}
          data={data}
          limit={limit}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default Vehicles;
