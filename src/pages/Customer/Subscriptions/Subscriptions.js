import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Add } from "../../../components/common/images";
import TableLayer from "../../../components/data/Customer/Subscription/TableLayer";
import { useNavigate } from "react-router-dom";
import Filter from "../../../components/common/Filter";
import { useGetUserSubs } from "../../../services/customer/query/user";
import { subFieldOption } from "../../../components/common/constants";
import { formatNewDate } from "../../../utils/helpers";

const Subscriptions = () => {
  const navigate = useNavigate();

  const [filtArray, setFiltArray] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);

  const convertedFilters = filtArray?.map((filterObj) => {
    return filterObj?.gte
      ? `filter=${filterObj?.title}||$gte||"${formatNewDate(
          filterObj?.gte
        )}T00:00:00"`
      : filterObj?.lte
      ? `filter=${filterObj?.title}||$lte||"${formatNewDate(
          filterObj?.lte
        )}T23:59:59"`
      : `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
          filterObj?.filter
        }"`;
  });

  const query = convertedFilters?.join("&");
  const { mutate: subMutate, data: sub, isLoading } = useGetUserSubs();

  useEffect(() => {
    subMutate({ filterString: query, limit: limit, page: page });
  }, [query, page, limit]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  useEffect(() => {
    if (!sub) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = sub?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [sub, page, limit]);

  return (
    <Box minH="75vh">
      <Box bg="#fff" w="full" px="23px" py="24px" borderRadius="8px">
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={subFieldOption}
          title={
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
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
          sub={sub}
          subMutate={subMutate}
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

export default Subscriptions;
