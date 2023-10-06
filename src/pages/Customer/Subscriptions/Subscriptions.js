import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Add } from "../../../components/common/images";
import TableLayer from "../../../components/data/Customer/Subscription/TableLayer";
import { useNavigate } from "react-router-dom";
import Filter from "../../../components/common/Filter";
import { useGetUserSubs } from "../../../services/customer/query/user";

const Subscriptions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [filt, setFilt] = useState({
    title: "",
    type: "",
    filter: "",
  });
  const [filtArray, setFiltArray] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const filters = [`filter=${filt?.title}||${filt?.type}||"${filt?.filter}"`];
  const convertedFilters = filtArray.map((filterObj) => {
    return `filter=${filterObj.title}||${filterObj.type}||"${filterObj.filter}"`;
  });
  const query = convertedFilters.join("&");
  console.log(convertedFilters);
  const { mutate: subMutate, data: sub, isLoading } = useGetUserSubs();

  useEffect(() => {
    subMutate({ filterString: query, limit: limit, page: page });
  }, []);
  return (
    <Box minH="75vh">
      <Box bg="#fff" w="full" px="23px" py="24px" borderRadius="8px">
        <Filter
          setFiltArray={setFiltArray}
          setShow={setShow}
          filtArray={filtArray}
          values={filt}
          handleSearch={() =>
            subMutate({ filterString: query, limit: limit, page: page })
          }
          setValues={setFilt}
          show={show}
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
          filtArray={filtArray}
          filt={filt}
        />
      </Box>
    </Box>
  );
};

export default Subscriptions;
