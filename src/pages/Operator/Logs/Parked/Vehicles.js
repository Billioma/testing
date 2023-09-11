import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ParkedTableLayer from "../../../../components/data/Operator/Logs/ParkedTableLayer";
import { useGetParked } from "../../../../services/operator/query/logs";

const Vehicles = () => {
  const { mutate, data, isLoading } = useGetParked();

  const [page, setPage] = useState(0);
  const limit = 10;

  useEffect(() => {
    mutate({ limit, page: page + 1 });
  }, [page]);

  return (
    <Box minH="75vh">
      <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
        <Flex align="center" justifyContent="space-between" w="full">
          <Text
            fontSize="14px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            All Valeted Vehicles
          </Text>

          <Flex align="center" gap="24px">
            <Flex
              justifyContent="center"
              align="center"
              cursor="pointer"
              transition=".3s ease-in-out"
              _hover={{ bg: "#F4F6F8" }}
              onClick={mutate}
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
          </Flex>
        </Flex>

        <ParkedTableLayer
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
