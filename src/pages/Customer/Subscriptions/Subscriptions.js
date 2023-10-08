import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Add } from "../../../components/common/images";
import TableLayer from "../../../components/data/Customer/Subscription/TableLayer";
import { useNavigate } from "react-router-dom";
import Filter from "../../../components/common/Filter";
import { useGetUserSubs } from "../../../services/customer/query/user";
import { subFieldOption } from "../../../components/common/constants";

const Subscriptions = () => {
  const navigate = useNavigate();

  const [filtArray, setFiltArray] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });
  const query = convertedFilters?.join("&");
  const { mutate: subMutate, data: sub, isLoading } = useGetUserSubs();

  useEffect(() => {
    subMutate({ filterString: query, limit: limit, page: page });
  }, [query, page]);

  return (
    <Box minH="75vh">
      <Box bg="#fff" w="full" px="23px" py="24px" borderRadius="8px">
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={subFieldOption}
          handleSearch={() =>
            subMutate({ filterString: query, limit: limit, page: page })
          }
          title={
            <Text color="#242628" fontWeight={500} lineHeight="100%">
              Subscriptions
            </Text>
          }
          main={
            <Button
              onClick={() => navigate("/customer/subscriptions/create")}
              display="flex"
              gap="8px"
              borderRadius="8px"
              fontSize="12px"
            >
              <Text>Add Subscription</Text>
              <Add fill="#fff" />
            </Button>
          }
        />

        <TableLayer
          setPage={setPage}
          page={page}
          isLoading={isLoading}
          sub={sub}
          limit={limit}
          subMutate={subMutate}
        />
      </Box>
    </Box>
  );
};

export default Subscriptions;
