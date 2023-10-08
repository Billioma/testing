import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetPolicies } from "../../../../services/operator/query/locations";
import TableLayer from "../../../../components/data/Operator/Locations/Policies/TableLayer";
import Filter from "../../../../components/common/Filter";
import { opPolicyFieldOption } from "../../../../components/common/constants";

const Policies = () => {
  const { mutate, data, isLoading } = useGetPolicies();

  const [page, setPage] = useState(1);
  const limit = 10;

  const navigate = useNavigate();

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

  useEffect(() => {
    sessionStorage.removeItem("edit");
  }, []);

  return (
    <Box minH="75vh">
      <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
        <Filter
          gap
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          handleSearch={() =>
            mutate({ filterString: query, limit: limit, page: page })
          }
          fieldToCompare={opPolicyFieldOption}
          title={
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
              All Policies
            </Text>
          }
          main={
            <>
              {" "}
              <Button
                onClick={() => navigate("/operator/locations/policies/create")}
                display="flex"
                gap="8px"
                fontSize=""
              >
                <Text fontSize="12px">Add a Policy</Text>
                <MdAdd size="20px" />
              </Button>
              <Flex
                justifyContent="center"
                align="center"
                cursor="pointer"
                transition=".3s ease-in-out"
                _hover={{ bg: "#F4F6F8" }}
                onClick={() => mutate({ limit, page: page })}
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

export default Policies;
