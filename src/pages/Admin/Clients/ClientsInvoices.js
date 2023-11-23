import React, { useState, useEffect } from "react";
import ClientsInvoicesTableLayer from "../../../components/data/Admin/Clients/ClientsInvoicesTableLayer";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import Filter from "../../../components/common/Filter";
import { clientInvoiceOptions } from "../../../components/common/constants";
import { MdAdd } from "react-icons/md";
import { useGetClientsInvoices } from "../../../services/admin/query/clients";

export default function () {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(25);
  const navigate = useNavigate();
  const [isRefetch, setIsRefetch] = useState(false);

  const [filtArray, setFiltArray] = useState([]);

  const convertedFilters = filtArray?.map((filterObj) => {
    return `filter=${filterObj?.title}||${filterObj?.type || "cont"}||"${
      filterObj?.filter
    }"`;
  });

  const query = convertedFilters?.join("&");

  const { data, isLoading, refetch } = useGetClientsInvoices(
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

  useEffect(() => {
    refetch();
  }, []);

  const handleRefreshClick = async () => {
    setIsRefetch(true);
    await refetch();
  };

  return (
    <Box border="1px solid #d4d6d8" borderRadius="8px" p="16px 23px 24px">
      <Filter
        setFiltArray={setFiltArray}
        filtArray={filtArray}
        fieldToCompare={clientInvoiceOptions}
        handleSearch={refetch}
        title={
          <Text
            fontSize="14px"
            fontWeight={500}
            lineHeight="100%"
            color="#242628"
          >
            All Clients Invoices
          </Text>
        }
        gap
        main={
          <>
            <Button
              display="flex"
              bg="#000"
              gap="8px"
              onClick={() => navigate(PRIVATE_PATHS.ADMIN_ADD_CLIENT_INVOICE)}
            >
              <Text fontSize="12px">Add a Client invoice</Text>
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
      <ClientsInvoicesTableLayer
        data={data}
        isLoading={isLoading}
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        startRow={startRow}
        endRow={endRow}
        refetch={refetch}
      />
    </Box>
  );
}
