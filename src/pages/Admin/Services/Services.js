import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import TableLayer from "../../../components/data/Admin/Services/TableLayer";
import AdminAddServiceModal from "../../../components/modals/AdminAddServiceModal";
import { useGetServices } from "../../../services/admin/query/services";
import AdminEditServiceModal from "../../../components/modals/AdminEditServiceModal";
import Filter from "../../../components/common/Filter";
import { servicesOptions } from "../../../components/common/constants";
import { MdAdd } from "react-icons/md";
import { formatDate } from "../../../utils/helpers";

export default function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState({
    isOpen: false,
    selectedService: null,
  });
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

  const { data, isLoading, refetch } = useGetServices(
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
    refetch();
  }, []);

  const handleRefreshClick = async () => {
    setIsRefetch(true);
    await refetch();
  };

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

  const handleEdit = (service) => {
    setIsEditOpen({ isOpen: true, selectedService: service });
  };

  return (
    <Box>
      <Box w="full" border={"1px solid #E4E6E8"} borderRadius={"12px"}>
        <Filter
          setFiltArray={setFiltArray}
          filtArray={filtArray}
          fieldToCompare={servicesOptions}
          title={
            <Text
              fontSize="14px"
              fontWeight={500}
              lineHeight="100%"
              color="#242628"
            >
              All Services
            </Text>
          }
          gap
          main={
            <>
              <Button
                onClick={() => setIsOpen(true)}
                display="flex"
                bg="#000"
                gap="8px"
              >
                <Text fontSize="12px"> Add a Service</Text>
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
          setIsOpen={setIsOpen}
          setPage={setPage}
          handleEdit={handleEdit}
          setLimit={setLimit}
          startRow={startRow}
          endRow={endRow}
          refetch={refetch}
        />
      </Box>

      <AdminAddServiceModal
        isOpen={isOpen}
        refetch={refetch}
        onClose={() => setIsOpen(false)}
      />

      <AdminEditServiceModal
        isOpen={isEditOpen.isOpen}
        service={isEditOpen.selectedService}
        refetch={refetch}
        onClose={() => setIsEditOpen(false)}
      />
    </Box>
  );
}
